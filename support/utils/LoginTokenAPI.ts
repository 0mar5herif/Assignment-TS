import { APIResponse, Page } from '@playwright/test';

export class LoginTokenAPI {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async token(email, password, apikey, bearertoken): Promise<void> {
        const response = await this.page.request.post('https://supabase-stg.alt.art/auth/v1/token?grant_type=password', {
            data: {
                "email": email,
                "password": password,
                "gotrue_meta_security": {}
            },
            headers: {
                'apikey': apikey,
                'authorization': bearertoken,
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
        const responseHeaders = response.headers();

        // Access the Set-Cookie header (if present)
        const setCookieHeader = responseHeaders['set-cookie'];

        // Regular expressions to extract sb-access-token and sb-refresh-token
        const accessTokenMatch = setCookieHeader?.match(/sb-access-token=([^;]+)/);
        const refreshTokenMatch = setCookieHeader?.match(/sb-refresh-token=([^;]+)/);

        const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
        const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;

        await this.page.context().addCookies([{
            name: 'sb-supabase-stg-auth-token',
            value: `["${accessToken}","${refreshToken}",null,null,null]`,
            domain: 'staging.alt.art',
            path: '/',
          }]);
    }
}