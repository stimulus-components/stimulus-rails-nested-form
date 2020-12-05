# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0

### Changed

- **Breaking** Using the new `values` static property

```diff
- <form data-controller="nested-form" data-nested-form-wrapper-selector=".nested-form-wrapper">
+ <form data-controller="nested-form" data-nested-form-wrapper-selector-value=".nested-form-wrapper">
```

## [1.1.0] - 2020-10-31

## Changed

- Adding `remove` support.

## [1.0.0] - 2020-10-15

### Added

- Adding controller
