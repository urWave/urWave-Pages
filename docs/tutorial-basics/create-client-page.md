---
sidebar_position: 2
---

# 2 - Client-Side
import BrowserWindow from '@site/src/components/BrowserWindow';

## Introduction

This guide demonstrates how to create the client-side implementation of a module in the UW Platform using the Book Store example. We'll cover creating components, services, and implementing proper routing and permissions.
:::tip My tip

Make Sure to have followed the [Installation Guide](/docs/installation) to set up your development environment.

:::
## Prerequisites

Before starting development, ensure you have:
- Node.js and npm installed
- Angular CLI
- Access to the UW Platform client codebase



## Creating the Book Module

### Module Setup

1. Generate the module:
<BrowserWindow title="" url="Terminal" language="bash">
```bash
ng g module books --routing
```
</BrowserWindow>

2. Create the following structure:
<BrowserWindow title="" url="Strcture" language="text">
```bash
books/
├── models/
│   ├── book.model.ts
│   └── book-search.model.ts
├── pages/
│   ├── book-list/
│   └── book-add-edit/
└── services/
    └── books.service.ts
```
</BrowserWindow>

### Permissions

Add permissions in `src/app/core/constants/permissions.ts`:
<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
export class Permissions {
    public static ReadBooks = 'T.Books';
    public static CreateBook = 'T.Books.Add';
    public static UpdateBook = 'T.Books.Update';
    public static DeleteBook = 'T.Books.Delete';
}
```
</BrowserWindow>


### Components

Add `book-type.enum.ts`  in app/shared/enums/book-type.enum.ts

<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
export enum BookTypeEnum {
  Undefined,
  Adventure,
  Biography,
  Dystopia,
  Fantastic,
  Horror,
  Science,
  ScienceFiction,
  Poetry
}

```
</BrowserWindow>

1. Create book list component:
<BrowserWindow title="" url="Command" language="bash">
```bash
ng g c book-list
```
</BrowserWindow>

Example implementation:
<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
@Component({
    selector: 'app-book-list',
    standalone: true,
    imports: [
        Button,
        Card,
        DatePicker,
        SharedModule,
        TranslateModule,
    ],
    templateUrl: './book-list.component.html'
})
export class BookListComponent extends BasePageComponent implements OnInit {
    books!: PageListModel<BookModel>;
    searchCriteria: BookSearchModel;

    constructor(
        private bookService: BooksService,
        private messageService: MessageService,
    ) {
        super();
    }

    loadData() {
        this.bookService.getBookList(this.searchCriteria).subscribe((data) => {
            this.books = data;
        });
    }

    // ... other methods
}
```
</BrowserWindow>

### Services

Create `books.service.ts`:

<BrowserWindow title="" url="Command" language="bash">
```bash
ng generate service <service-name>
```
</BrowserWindow>


<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
@Injectable({
    providedIn: 'root',
})
export class BooksService {
    baseUrl = `${AppSettingService.settings.baseApiUrl}/books`;

    constructor(private http: HttpCommonService) {}

    getBookList(model: SearchCriteriaBase): Observable<PageListModel<BookModel>> {
        return this.http.get({
            url: this.baseUrl,
            params: this.http.convertModelToParams(model),
        });
    }

    getBookById(bookId: string): Observable<BookModel> {
        return this.http.get({
            url: `${this.baseUrl}/${bookId}`,
        });
    }

    // ... other methods
}
```
</BrowserWindow>

## Routing

1. Configure module routing in `books-routing.module.ts`:

<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/book-list/book-list.component')
                .then((m) => m.BookListComponent),
    },
    {
        path: 'add',
        canDeactivate: [pendingChangesGuard],
        canActivate: [ngxPermissionsGuard],
        data: {
            title: 'title.book-add',
            permissions: {
                only: [Permissions.CreateBook],
                redirectTo: '/errors/403',
            },
        },
        loadComponent: () =>
            import('./pages/book-add-edit/book-add-edit.component')
                .then((m) => m.BookAddEditComponent),
    },
    // ... other routes
];
```
</BrowserWindow>

2. Add to main routing in `modules-routing.module.ts`:

<BrowserWindow title="" url="https:localhost:4200" language="Typescript">
```typescript
const routes: Routes = [
    {
        path: 'books',
        canActivate: [ngxPermissionsGuard],
        data: {
            title: 'title.book-list',
            permissions: {
                only: [Permissions.ReadBooks],
                redirectTo: '/errors/403',
            },
        },
        loadChildren: () => 
            import('../modules/books/books.module')
                .then((m) => m.BooksModule),
    },
];
```
</BrowserWindow>


## Localization

Add translations in the following files:

1. `src/assets/i18n/en/app.json`:
<BrowserWindow title="" url="https:localhost:4200" language="json">
```json
{
    "sidebar": {
        "books": "Books"
    },
    "books": {
        "EditBook": "Edit Book",
        "addBook": "Add Book",
        "name": "Book Name",
        "publishDate": "Publish Date",
        "price": "Price",
        "add": "Add Book"
    }
}
```
</BrowserWindow>

2. `src/assets/i18n/ar/app.json`:
<BrowserWindow title="" url="https:localhost:4200" language="json">
```json
{
    "sidebar": {
        "books": "الكتب"
    },
    "books": {
        "EditBook": "تعديل الكتاب",
        "addBook": "إضافة كتاب",
        "name": "اسم الكتاب",
        "publishDate": "تاريخ النشر",
        "price": "السعر",
        "add": "إضافة كتاب"
    }
}
```
</BrowserWindow>

3. Add to titles in both languages:

`src/assets/i18n/en/title.json`:
<BrowserWindow title="" url="https:localhost:4200" language="json">
```json
{
    "title": {
        "book-list": "Books",
        "book-add": "Add Book",
        "book-update": "Edit Book"
    }
}
```
</BrowserWindow>


`src/assets/i18n/ar/title.json`:
<BrowserWindow title="" url="https:localhost:4200" language="json">
```json
{
    "title": {
        "book-list": "الكتب",
        "book-add": "إضافة كتاب",
        "book-update": "تعديل الكتاب"
    }
}
```
</BrowserWindow>
