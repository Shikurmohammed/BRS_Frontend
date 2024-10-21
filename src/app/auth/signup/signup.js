var app = angular.module("bavApp", ["bootstrap.angular.validation", "ui.bootstrap"]);

app.config(['bsValidationConfigProvider', function(bsValidationConfigProvider) {
  bsValidationConfigProvider.global.setValidateFieldsOn('display');
  bsValidationConfigProvider.global.setDisplayErrorsAs('tooltip');
  bsValidationConfigProvider.global.tooltipAppendToBody = true;
  bsValidationConfigProvider.global.errorMessagePrefix = '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp;';
}])