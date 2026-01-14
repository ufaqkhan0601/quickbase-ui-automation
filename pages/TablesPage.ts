import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablesPage extends BasePage {
  private newTableBtn: Locator;
  private fromScratch: Locator;
  private modal: Locator;
  private tableNameInput: Locator;
  private singleRecordInput: Locator;
  private descriptionTextarea: Locator;
  private suggestedIcons: Locator;
  private createTableBtn: Locator;
  private newFieldsModal: Locator;
  private fieldLabelInputs: Locator;
  private addFieldsBtn: Locator;
  private fieldsTable: Locator;
  private leftTablesNav: Locator;
  private recordGrid: Locator;
  private newRecordBtn: Locator;
  private inputDataField: Locator;
  private saveRecordButton: Locator;
  private recordSavedBanner: Locator;
  private duplicateNameError: Locator;
  private copyModal: Locator;
  private copyKeepDataCheckbox: Locator;
  private copyNewTableNameInput: Locator;
  private copyConfirmBtn: Locator;
  private deleteModal: Locator;
  private deleteConfirmInput: Locator;
  private deleteConfirmBtn: Locator;
  private qbNotification: Locator;
  private defaultReportPage: Locator;
  constructor(page: Page) {
    super(page);
    this.newTableBtn = page.locator('button').filter({ hasText: '+ New Table' });
    this.fromScratch = page.locator('#btnNewTableAppTables');
    this.modal = page.locator('data-test-id=newTableDialog');
    this.tableNameInput = page.locator('#react-select-3-input');
    this.singleRecordInput = page.locator('data-test-id=SingleRecordInput');
    this.descriptionTextarea = page.locator('data-test-id=TableDescription');
    this.suggestedIcons = page.locator("//div[@data-test-id='icon-tray']//button");
    this.createTableBtn = page.locator('data-test-id=dialogOkButton');
    this.newFieldsModal = page.locator('data-test-id=dialog-container');
    this.fieldLabelInputs = page.locator('input[placeholder="Add a label"]');
    this.addFieldsBtn = this.newFieldsModal.locator('button').filter({ hasText: 'Add fields' });
    this.fieldsTable = page.locator('table');
    this.leftTablesNav = page.locator('.css-1iyoj2o');
    this.newRecordBtn = page.locator('#newRecordSpaButton').first();
    this.inputDataField=page.locator('data-test-id=text-field-input');
    this.recordGrid = page.locator('[role="rowgroup"].ag-center-cols-container');
    this.saveRecordButton=page.locator('data-test-id=save-record-button');
    this.recordSavedBanner=page.locator('.notificationMessage', { hasText: 'Record saved' });
    this.duplicateNameError = page.locator('span:has-text("There is already a table with this name.")');
    this.copyModal = page.locator('#dialogCustomizeCreateNewTable');
    this.copyKeepDataCheckbox = page.locator('input[name="keepdata"]');
    this.copyNewTableNameInput = page.locator('input[name="createNewTableName"]').first();
    this.copyConfirmBtn = page.locator('button').filter({ hasText: 'Copy' });
    this.deleteModal = page.locator('#dialogDeleteTable');
    this.deleteConfirmInput = page.locator('#typeYesField');
    this.deleteConfirmBtn = page.locator('button').filter({ hasText: 'Delete Table' });
    this.qbNotification = page.getByText('Table \'Copy of Tasks\' deleted');
    this.defaultReportPage = page.locator("//h1[text()='Default report']");
  }

  async openNewTableModal() {
    await this.click(this.newTableBtn);
     await this.click(this.fromScratch);
     await this.waitForVisible(this.modal);
  }

  async fillNewTableForm(args: {
    tableName: string;
    singleRecordName: string;
    description?: string;
    selectSuggestedIconIndex?: number;
  }) {
    await this.fill(this.tableNameInput, args.tableName);
    await this.fill(this.singleRecordInput, args.singleRecordName);
    if (args.description) {
        await this.fill(this.descriptionTextarea, args.description);
        }

    if (typeof args.selectSuggestedIconIndex === 'number') {
      await this.click(this.suggestedIcons.nth(args.selectSuggestedIconIndex));
    }
  }

  async createTable() {
    await this.click(this.createTableBtn);
    await expect(this.page).toHaveTitle(/Fields/);
  }

  async waitForNewFieldsModal() {
    await this.waitForVisible(this.newFieldsModal);
  }

  async setDefaultNewFieldLabels(label1: string, label2: string) {
    await this.fill(this.fieldLabelInputs.nth(0), label1);
    await this.fill(this.fieldLabelInputs.nth(1), label2);
  }

  async addFields() {
    await this.click(this.addFieldsBtn);
  }

  async assertFieldExists(label: string, typeText: string) {
    const row = this.fieldsTable.locator('tr', { hasText: label }).first();
    await expect(row).toBeVisible();
    await expect(row).toContainText(typeText);
  }

  async openTableFromLeftNav(tableName: string) {
    const tableLink = this.leftTablesNav.locator(`a:has-text("${tableName}")`);
    await this.click(tableLink);
    await expect(this.page).toHaveURL(/\/table\//);
  }

  async clickNewRecordButton() {
    await this.page.waitForLoadState('networkidle');
    await this.click(this.newRecordBtn);
  }

  async fillRecordFields(column1: string, column2: string) {
    await this.page.waitForLoadState('networkidle');
    const col1 = this.inputDataField.nth(0);
    const col2 = this.inputDataField.nth(1);

    await this.fill(col1, column1);
    await this.fill(col2, column2);
  }

  async saveRecord() {
    await this.click(this.saveRecordButton);
  }

  async assertSaveBannerVisible() {
    await this.waitForVisible(this.recordSavedBanner);
  }

  async assertRecordInGrid(values: string[]) {
    for (const v of values) {
      await expect(this.recordGrid).toContainText(v);
    }
  }
  async assertDuplicateNameValidation() {
  await this.waitForVisible(this.duplicateNameError);
  await expect(this.createTableBtn).toBeDisabled();
}


private tableRowByName(tableName: string): Locator {
    return this.page.locator('#appTablesListTable').first().locator('tr', {
      has: this.page.locator('a', { hasText: tableName }),
    }).first();
  }

  private copyIconForRow(row: Locator): Locator {
    return row.locator('a.RowAction.Copy[title="Copy this table"]');
  }


private trashIconForRow(row: Locator): Locator {
  return row.locator('a.RowAction.Delete[title="Permanently delete this table"]');
}


  async copyTable(sourceTableName: string) {
    const row = this.tableRowByName(sourceTableName);
    await expect(row).toBeVisible();
    await this.click(this.copyIconForRow(row));
    await expect(this.copyModal).toBeVisible();
    const copiedName = await this.copyNewTableNameInput.inputValue();
    if (!(await this.copyKeepDataCheckbox.isChecked())) {
      await this.click(this.copyKeepDataCheckbox);
    }
    await this.click(this.copyConfirmBtn);
    await this.page.waitForLoadState('networkidle');
    await expect(this.defaultReportPage).toBeVisible();
    await expect(this.page.locator(`a:has-text("${copiedName}")`).first()).toBeVisible();
    return copiedName;
  }

  async deleteTable(tableName: string) {
    const row = this.tableRowByName(tableName);
    await expect(row).toBeVisible();

    await this.click(this.trashIconForRow(row));
    await expect(this.deleteModal).toBeVisible();

    await this.fill(this.deleteConfirmInput, 'YES');
    await this.click(this.deleteConfirmBtn);

    await expect(this.qbNotification).toBeVisible();
  }
}
