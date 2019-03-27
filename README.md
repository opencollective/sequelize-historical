# Historical tables for Sequelize

Warning: this is a fork of [sequelize-temporal](https://github.com/bonaval/sequelize-temporal) that adds support for Sequelize 5.

[![Build Status](https://travis-ci.org/opencollective/sequelize-historical.svg?branch=master)](https://travis-ci.org/opencollective/sequelize-historical) [![Dependency Status](https://david-dm.org/opencollective/sequelize-historical.svg)](https://david-dm.org/opencollective/sequelize-historical) [![NPM version](https://img.shields.io/npm/v/sequelize-historical.svg)](https://www.npmjs.com/package/sequelize-historical) [![Greenkeeper badge](https://badges.greenkeeper.io/opencollective/sequelize-historical.svg)](https://greenkeeper.io/)

## What is it?

Historical tables maintain **historical versions** of data. Modifying operations (UPDATE, DELETE) on these tables don't cause permanent changes to entries, but create new versions of them. Hence this might be used to:

- log changes (security/auditing)
- undo functionalities
- track interactions (customer support)

Under the hood a history table with the same structure, but without constraints is created.

The normal singular/plural naming scheme in Sequelize is used:

- model name: `modelName + History`
- table name: `modelName + Histories`

## Installation

```
npm install sequelize-historical
```

## How to use

### 1) Import `sequelize-historical`

```
var Sequelize = require('sequelize');
var Historical = require('sequelize-historical');
```

Create a sequelize instance and your models, e.g.

```
var sequelize = new Sequelize('', '', '', {
	dialect: 'sqlite',
	storage: __dirname + '/.test.sqlite'
});
```

### 2) Add the _historical_ feature to your models

```
var User = Historical(sequelize.define('User'), sequelize);
```

The output of `historical` is its input model, so assigning it's output to your
Model is not necessary, hence it's just the lazy version of:

```
var User = sequelize.define('User', {.types.}, {.options.}); // Sequelize Docu
Historical(User, sequelize);
```

## Options

The default syntax for `Historical` is:

`Historical(model, sequelizeInstance, options)`

whereas the options are listed here (with default value).

```js
{
  /* runs the insert within the sequelize hook chain, disable
  for increased performance without warranties */
  blocking: true,
  /* By default sequelize-historical persist only changes, and saves the previous state in the history table.
  The "full" option saves all transactions into the historical database
  (i.e. this includes the latest state.)
   This allows to only query the hostory table to get the full history of an entity.
  */
  full: false
```

## Details

@See: https://wiki.postgresql.org/wiki/SQL2011Temporal

### History table

History table stores historical versions of rows, which are inserted by triggers on every modifying operation executed on current table. It has the same structure and indexes as current table, but it doesn’t have any constraints. History tables are insert only and creator should prevent other users from executing updates or deletes by correct user rights settings. Otherwise the history can be violated.

### Hooks

Triggers for storing old versions of rows to history table are inspired by referential integrity triggers. They are fired for each row before UPDATE and DELETE (within the same transaction)

### Notes

If you only use Postgres, you might want to have a look at the [Temporal Table](https://github.com/arkhipov/temporal_tables) extension.

## License

The MIT License (MIT)

Copyright (c) 2015 BonaVal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
