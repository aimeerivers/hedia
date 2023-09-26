import { After } from "@cucumber/cucumber";

After(async function () {
  if(this.browser) {
    await this.browser.close();
  }
});
