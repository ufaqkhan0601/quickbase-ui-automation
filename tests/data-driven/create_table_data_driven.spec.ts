import { test } from '../../fixtures/testFixtures';
import testCases from '../../data/table_create_data.json';

const unique = (prefix: string) => `${prefix}_${Date.now()}`;

test.describe.serial('Tables - Create table using data driven', () => {

  // Iterate through each dataset for data-driven execution
  for (const data of testCases.cases) {

    test(`create table data driven - ${data.tableName}`,{ tag: ['@datadriven'] },async ({ loginPage }) => {

        // Login and land on home page
        const home = await loginPage.login();

        // Open assigned application
        const appHome = await home.openApp();

        // Navigate to Tables page
        const tables = await appHome.goToTables();

        // Open New Table modal
        await tables.openNewTableModal();

        // Prepare unique table data for this iteration
        const tableName = unique(data.tableName);
        const recordName = data.recordName;
        const descriptionText = data.description;

        // Fill new table form using dataset values
        await tables.fillNewTableForm({
          tableName,
          singleRecordName: recordName,
          description: descriptionText,
          selectSuggestedIconIndex: 2,
        });

        // Create the table
        await tables.createTable();

        // Validate New Fields modal appears after creation
        await tables.waitForNewFieldsModal();
      }
    );

  }

});
