import { expect, type Locator, type Page } from '@playwright/test';
import path from 'path';

export class ArtworkPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navbuttonArtwork() {
        await this.page.getByRole('link', { name: 'Artworks' }).click();
        await this.page.waitForURL('https://staging.alt.art/artworks');
    }

    async buttonArtworkCreateForm() {
        await this.page.locator('.mb-12 > .flex').click();
        await this.page.waitForURL('https://staging.alt.art/artworks/create');
    }

    async fillArtworkForm(artworkname,imagepath,collaborator) {
        //Artwork Name
        await this.page.locator('#artwork_name').fill(artworkname)

        //Edition Type
        await this.page.getByRole('button', { name: 'Select Edition Type' }).click()
        await this.page.getByText('Limited Edition').click()

        //Description
        await this.page.locator('.ce-paragraph').fill('Description')

        //Set Prices
        await this.page.locator('#current_price').fill('3.00')
        await this.page.locator('#primary_sale_price').fill('3.00')

        //Choose Date
        await this.page.getByRole('button', { name: 'Choose Date' }).first().click()
        await this.page.locator(':nth-child(3) > :nth-child(4) > .rdp-button_reset').click()

        //Enter username
        await this.page.getByPlaceholder('Username or Email address').first().press(" ")
        await this.page.getByPlaceholder('Username or Email address').first().press("Enter")

        //upload file -- works
        const handle = this.page.locator('input[type="file"]');
        await handle.setInputFiles(imagepath)
        await this.page.getByText('Select File').click()

        //react list options
        //they share the same class when empty it is undefined so i pick the first every time
        //alternatively i could look for it by placeholder text as that is unique
        //react list option - style of artwork
        await this.page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first().click()
        await this.page.locator('#react-select-4-option-0 > .flex').click()

        //react list option - nft genesis
        await this.page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first().click()
        await this.page.locator('#react-select-5-option-0 > .flex').click()

        //react list option - supply
        await this.page.locator('.undefined > .css-1aagls8-control > .css-hlgwow > .css-19bb58m').first().click()
        await this.page.locator('#react-select-6-option-0 > .flex').click()

        //collaborator field
        await this.page.locator('#react-select-7-input').pressSequentially(collaborator)
        await this.page.locator('#react-select-7-input').press("Enter")

        //owned by field
        await this.page.getByPlaceholder('Username or Email address').first().click()
        await this.page.getByPlaceholder('Username or Email address').first().press(" ")
        await this.page.getByPlaceholder('Username or Email address').first().press("Enter")

        //select marketplace field
        await this.page.getByRole('button', { name: 'Select Marketplace' }).click()
        await this.page.locator('ul[role="listbox"] li').nth(0).click();
        await this.page.locator('#url').fill('www.google.com')

        //choose date field - minted on
        await this.page.getByRole('button', { name: 'Choose Date' }).first().click()
        await this.page.locator(':nth-child(3) > :nth-child(4) > .rdp-button_reset').click()

        //select copyright field
        await this.page.getByRole('button', { name: 'Select copyright' }).click()
        await this.page.locator('ul[role="listbox"] li').nth(0).click();

        //radio buttons
        await this.page.locator('div').filter({ hasText: /^Artist Royalty \*YesNo$/ }).getByLabel('Yes').click()
        await this.page.locator('div').filter({ hasText: /^Is there a physical pieceYesNo$/ }).getByLabel('Yes').click()

        //choose date field - created on
        await this.page.getByRole('button', { name: 'Choose Date' }).first().click()
        await this.page.locator(':nth-child(3) > :nth-child(4) > .rdp-button_reset').click()
    }

    async submitArtworkForm() {
        await this.page.getByRole('button', { name: 'Publish' }).click()
        await this.page.waitForURL('https://staging.alt.art/artworks')
    }
}