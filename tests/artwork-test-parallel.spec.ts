import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../support/PageObjects/LoginPage';
import { DataGenerator } from '../support/utils/dataGen';
import { ArtworkPage } from '../support/pageObjects/ArtworkPage';
import { LoginTokenAPI } from '../support/utils/LoginTokenAPI';
const fs = require('fs');

const artworkjsonPath = path.resolve(__dirname, '../support/files/test-data/artwork/artworkname.json')
const imagePath = path.resolve(__dirname, '../support/files/test-image/test.png')
const email = 'jamiwa8396@tospage.com'
const password = 'nhk9dad2EQW!xae_bpm'
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'
const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'

test('Submit Artwork test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const artworkPage = new ArtworkPage(page);
  const dataGen = new DataGenerator();
  const logintokenAPI = new LoginTokenAPI(page);

  const rng = await dataGen.RandomNumber()
  const artworkname = `Test ${rng}`

  console.log(
    `Email: ${email}, Password: ${password}, artwork name: ${artworkname}`
  )
  // //login form
  // await loginPage.goto();
  // await loginPage.fillForm(email,password)

  await logintokenAPI.token(email, password, apikey, bearer)

  //navigate to artwork
  // await artworkPage.navbuttonArtwork()
  await page.goto('https://staging.alt.art/artworks')
  //navigate to create
  await artworkPage.buttonArtworkCreateForm()

  //fill form and submit
  await artworkPage.fillArtworkForm(artworkname, imagePath, email)
  await artworkPage.submitArtworkForm()

  //add code here to save the artwork name and look for that in the second and third tests to run in parallel
  await fs.writeFileSync(artworkjsonPath, JSON.stringify({ artworkname: artworkname }), 'utf-8')
});

test('Check for created artwork test in listview', async ({ page }) => {

  const logintokenAPI = new LoginTokenAPI(page);
  const data = JSON.parse(fs.readFileSync(artworkjsonPath, 'utf-8'))
  const savedartName = data.artworkname

  await logintokenAPI.token(email, password, apikey, bearer)

  await page.goto('https://staging.alt.art/artworks');
  //check if exists
  const heading = page.getByRole('heading', { name: savedartName });
  await expect(heading).toBeVisible();
  await expect(heading).toBeEnabled();
  await expect(heading).toHaveText(savedartName);
  //check for image visible
  await expect(page.getByRole('img', { name: savedartName })).toBeVisible()

});

test('Create review for artwork', async ({ page }) => {

  const logintokenAPI = new LoginTokenAPI(page);
  const data = JSON.parse(fs.readFileSync(artworkjsonPath, 'utf-8'))
  const savedartName = data.artworkname

  await logintokenAPI.token(email, password, apikey, bearer)

  await page.goto('https://staging.alt.art/artworks');
  await page.getByRole('heading', { name: savedartName }).click()

  await page.getByRole('tab', { name: 'Reviews' }).click()
  await page.locator('#review-title').fill('Review Title')
  await page.locator('#review-detail').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  await page.locator('.flex-col > .flex > button').click()

});
