interface String {
  toTitleCase(): string;
}

String.prototype.toTitleCase = function (this): string {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
