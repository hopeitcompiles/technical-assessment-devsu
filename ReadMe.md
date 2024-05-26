### REQUIREMTNS LIST

# F1. List of financial products: ✅

An application is required to visualize the different financial products offered by the Bank Institution loaded from an API. The layout should be done based on design D1.

When selecting an item, all the information of that item will be displayed in another view.

# F2. Search for financial products: ✅

A search for financial products through a text field is required. The layout should be done based on design D1.

# F3. Number of records: ✅

A list of the obtained records is required to be displayed. The layout should be done based on design D1.

# F4. Add product: ✅

The implementation of an "Add" button is required to navigate to the registration form. The form must allow the creation of a product using an "Add" button and must allow the form to be cleared using a "Reset" button. The layout of the base form should be done according to design D2 and the location of the main button according to design D3.

Each field of the form will contain its respective validation prior to submitting the form:

Field Validation
Id Required, minimum 3 characters and maximum 10, validation to ensure the Id does not exist by consuming the verification service.
Name Required, minimum 5 characters and maximum 100
Description Required, minimum 10 characters and maximum 200
Logo Required
Release Date Required, the date must be equal to or greater than the current date
Review Date Required, the date must be exactly one year after the release date

# F5. Edit product: ✅

A button is required that, when clicked, allows the product to be edited. Upon clicking, it should navigate to the product edit screen and should keep the ID field disabled. The edit form must maintain the same validations as in F4 and show errors for each field. The layout of the edit form should be done according to design D2.

# F6. Delete product: ✅

A button is required that, when clicked, displays a modal with a "Cancel" button and a "Delete" button. Clicking "Delete" should proceed with the deletion; in case of cancellation, it should only hide the modal. The layout of the modal should be done according to design D4.

## How to run the project and run the tests

### Installing dependencies

#with npm

```bash
npm install
```

```bash
yarn install
```

### Running the tests

#with npm

```bash
npm run test
```

```bash
yarn test
```

### Running app in android

- With Xxpo Go

```bash
npx expo start
```

- Natively - ! Java 11 and android sdk, JAVA_HOME and ANDROID_HOME variables are needed

```bash
npx expo run:android
```

### Running app in ios

- With Xxpo Go

```bash
npx expo start
```

- Natively

```bash
npx expo run:ios
```
