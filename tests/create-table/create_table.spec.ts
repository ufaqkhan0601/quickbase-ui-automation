import { test } from '../../fixtures/testFixtures';
import testData from '../../data/test_data.json';

const unique = (prefix: string) => `${prefix}_${Date.now()}`;

test.describe('Tables - Create table from scratch', () => {

  test('e2e postivie test -> create table -> add fields -> add record -> validate data',{ tag: ['@happy', '@e2e'] },async ({ loginPage }) => {

      // Login and land on home page
      const home = await loginPage.login();

      // Open assigned application
      const appHome = await home.openApp();

      // Navigate to Tables page
      const tables = await appHome.goToTables();

      // Open New Table modal
      await tables.openNewTableModal();

      // Prepare unique table data
      const tableName = `${testData.data.tableName}_${Date.now()}`;
      const recordName = testData.data.recordName;
      const descriptionText = testData.data.description;

      // Fill new table form (from scratch)
      await tables.fillNewTableForm({
        tableName,
        singleRecordName: recordName,
        description: descriptionText,
        selectSuggestedIconIndex: 2,
      });

      // Create the table
      await tables.createTable();

      // Add default fields to the table
      await tables.setDefaultNewFieldLabels(
        testData.data.column1,
        testData.data.column2
      );
      await tables.addFields();

      // Validate fields and their types
      await tables.assertFieldExists(testData.data.column1, 'Text');
      await tables.assertFieldExists(testData.data.column2, 'Text');

      // Open the created table
      await tables.openTableFromLeftNav(tableName);

      // Add a new record to the table
      await tables.clickNewRecordButton();
      await tables.fillRecordFields(
        testData.data.column1Data,
        testData.data.column2Data
      );
      await tables.saveRecord();

      // Validate save success and record data
      await tables.assertSaveBannerVisible();
      await tables.assertRecordInGrid([
        testData.data.column1Data,
        testData.data.column2Data
      ]);
    }
  );

  test('negative test -> create table -> give duplicate name -> validate error message', { tag: ['@negative'] },async ({ loginPage }) => {

      // Login and land on home page
      const home = await loginPage.login();

      // Open assigned application
      const appHome = await home.openApp();

      // Navigate to Tables page
      const tables = await appHome.goToTables();

      // Open New Table modal
      await tables.openNewTableModal();

      // Use an existing table name to trigger validation
      const tableName = testData.data.duplicateTableName;
      const recordName = testData.data.recordName;
      const descriptionText = testData.data.description;

      // Fill new table form with duplicate name
      await tables.fillNewTableForm({
        tableName,
        singleRecordName: recordName,
        description: descriptionText,
        selectSuggestedIconIndex: 2,
      });

      // Validate duplicate table name error
      await tables.assertDuplicateNameValidation();
    }
  );

});
