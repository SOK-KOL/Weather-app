
import { test, expect } from '@playwright/test';
test.describe('Проверка главной страницы', () =>{
    test.beforeEach(async ({ page }) => {
    // Переходим на начальный URL перед каждым тестом.
    await page.goto('http://localhost:5173/');
  });
test('Тест кнопки обновить на перезагрузку страницы', async ({ page }) => {
  await expect(page.getByText('Текущая погода')).toBeVisible();
  await page.getByRole('button', { name: 'Обновить' }).click();
  try{
  const loaderShow = await expect(page.locator('.loader')).toBeVisible()
  }
  catch{
      await expect(page.getByText('Текущая погода')).toBeVisible();
  }
 
})

test('Тест обновления города', async ({page}) => {
  await expect(page.locator('.current-weather__info-city')).toBeVisible()
  const oldCityText =  await page.locator('.current-weather__info-city').textContent();
  const newCityText = "Sochi";

  await page.getByRole('textbox', { name: 'Введите город' }).click();
  await page.getByRole('textbox', { name: 'Введите город' }).fill(`${newCityText}`);
  await page.getByRole('button', { name: 'Найти' }).click();
  await page.waitForTimeout(3000)

  await expect(page.locator('.current-weather__info-city')).toHaveText(`${newCityText}`);
})


test("Тест на абракадабру в поиске", async ({page}) => {
  await expect(page.locator('.current-weather__info-city')).toBeVisible()
  const oldCity = await page.locator('.current-weather__info-city').textContent();
   const somethingText = "sngoiernoernoernomtreogne";

  await page.getByRole('textbox', { name: 'Введите город' }).click();
  await page.getByRole('textbox', { name: 'Введите город' }).fill(`${somethingText}`);
  await page.getByRole('button', { name: 'Найти' }).click();

await page.waitForTimeout(3000);
  await expect(page.locator('.current-weather__info-city')).not.toHaveText(`${somethingText}`)

})



test('Тест перехода по ссылке', async ({page}) => {
await page.getByRole('link', { name: 'Подробный прогноз' }).click();
await expect(page).toHaveURL('http://localhost:5173/details')
});
});



