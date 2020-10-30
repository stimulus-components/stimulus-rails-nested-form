require('expect-puppeteer')

beforeAll(async () => {
  await page.goto('http://localhost:3000')
})

describe('#removable', () => {
  it('should remove persisted record', async () => {
    const remove = await page.$('#persisted-item .remove')
    await remove.click()

    const input = await page.$('#input-destroy')
    const item = await page.$('#persisted-item')

    expect(await input.evaluate(element => element.value, input)).toBe('1')
    expect(await item.evaluate(element => element.classList.contains('hidden'), item)).toBe(true)
  })

  it('should remove non persisted record', async () => {
    const button = await page.$('#nested-form-button')
    await button.click()

    const remove = await page.$('.non-persisted-item .remove')
    await remove.click()

    await expect(page).not.toMatchElement('.non-persisted-item')
  })
})
