import { test } from '../../fixtures/testFixtures';
import testData from '../../data/test_data.json';

test.describe('UI Tables – List actions', () => {

  test('copy table and delete copied table',{ tag: ['@functional', '@regression'] },  async ({ loginPage }) => {

      // Login and land on home page
      const home = await loginPage.login();

      // Open assigned application
      const appHome = await home.openApp();

      // Navigate to Tables page
      const tables = await appHome.goToTables();

      // Use an existing table as copy source
      const source = testData.data.duplicateTableName;

      // Copy the selected table and capture copied table name
      const copiedName = await tables.copyTable(source);

      // Navigate back to Tables page after copy
      await appHome.goToTables();

      // Delete the copied table to clean up
      await tables.deleteTable(copiedName);
    }
  );

});
