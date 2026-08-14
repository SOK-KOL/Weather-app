import { expect, test } from '@playwright/test';

test('кнопка обновления работает', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('domcontentloaded')
    await page.getByText("Обновить").click()
    await expect(page.getByRole('heading', { name: 'Idlib' }));
     
});