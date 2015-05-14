// Generated by CoffeeScript 1.9.2
(function() {
  var InputMatcher, escRE,
    slice = [].slice;

  window.fillWith = {
    "in": function(k, o) {
      return k in o && o[k] && o[k].length;
    },
    makeAddressLine1: function(data) {
      var line, usefields, useslash;
      line = "";
      usefields = {
        ln: "AddressDetails.HomeAddress.LevelNumber",
        un: "AddressDetails.HomeAddress.UnitNumber",
        so: "AddressDetails.HomeAddress.StreetNumber",
        sn: "AddressDetails.HomeAddress.StreetName",
        st: "AddressDetails.HomeAddress.StreetType",
        bn: "AddressDetails.HomeAddress.BuildingName"
      };
      useslash = false;
      if (fillWith["in"](usefields.un, data)) {
        line += "U " + data[usefields.un] + " ";
        useslash = true;
      }
      if (fillWith["in"](usefields.ln, data)) {
        line += "L " + data[usefields.ln] + " ";
        useslash = true;
      }
      if (useslash) {
        line += "/ ";
      }
      if (fillWith["in"](usefields.so, data)) {
        line += data[usefields.so] + " ";
      } else if (fillWith["in"](usefields.bn, data)) {
        line += data[usefields.bn] + " ";
      }
      if (fillWith["in"](usefields.sn, data)) {
        line += data[usefields.sn] + " ";
        if (fillWith["in"](usefields.st, data)) {
          line += data[usefields.st];
        }
      }
      return line.replace(/\s+$/g, "");
    }
  };

  escRE = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  InputMatcher = (function() {
    function InputMatcher(names, _match_fn, _populate_fn) {
      this.names = names;
      this._match_fn = _match_fn;
      this._populate_fn = _populate_fn;
    }

    InputMatcher.prototype.hasFields = function(fields) {
      if (typeof fields === !'array') {
        throw new "hasFields requires array as first argument.";
      }
      if (typeof this.names === 'string') {
        return fillWith["in"](this.names, fields);
      } else if ($.isArray(this.names)) {
        return 0 < $.map(this.names, function(n) {
          if (fillWith["in"](n, fields)) {
            return true;
          } else {
            return void 0;
          }
        }).length;
      }
    };

    InputMatcher.prototype.match = function(_) {
      return this._match_fn(_);
    };

    InputMatcher.prototype.populate = function(el, v) {
      var vals;
      if (typeof this.names === 'string') {
        return this._populate_fn(el, v[this.names]);
      } else if ($.isArray(this.names)) {
        vals = {};
        $.each(this.names, function(i, n) {
          vals[n] = v[n];
          return true;
        });
        return this._populate_fn(el, vals);
      }
    };

    return InputMatcher;

  })();

  (function($, window) {
    var FillWith;
    FillWith = (function() {
      FillWith.prototype.defaults = {
        "PersonalDetails.Honorific": "",
        "PersonalDetails.FirstName": "",
        "PersonalDetails.MiddleName": "",
        "PersonalDetails.LastName": "",
        "PersonalDetails.BirthDate.Day": "",
        "PersonalDetails.BirthDate.Month": "",
        "PersonalDetails.BirthDate.Year": "",
        "ContactDetails.Emails.Email.Address": "",
        "AddressDetails.HomeAddress.LevelNumber": "",
        "AddressDetails.HomeAddress.UnitNumber": "",
        "AddressDetails.HomeAddress.StreetNumber": "",
        "AddressDetails.HomeAddress.StreetName": "",
        "AddressDetails.HomeAddress.StreetType": "",
        "AddressDetails.HomeAddress.Suburb": "",
        "AddressDetails.HomeAddress.AdministrativeArea": "",
        "AddressDetails.HomeAddress.PostalCode": "",
        "AddressDetails.HomeAddress.Country": "",
        "AddressDetails.HomeAddress.BuildingName": "",
        "AddressDetails.PostalAddress.POBox": "",
        "AddressDetails.PostalAddress.LevelNumber": "",
        "AddressDetails.PostalAddress.UnitNumber": "",
        "AddressDetails.PostalAddress.StreetNumber": "",
        "AddressDetails.PostalAddress.StreetName": "",
        "AddressDetails.PostalAddress.StreetType": "",
        "AddressDetails.PostalAddress.Suburb": "",
        "AddressDetails.PostalAddress.AdministrativeArea": "",
        "AddressDetails.PostalAddress.PostalCode": "",
        "AddressDetails.PostalAddress.Country": "",
        "AddressDetails.PostalAddress.BuildingName": "",
        "AddressDetails.BillingAddress.POBox": "",
        "AddressDetails.BillingAddress.LevelNumber": "",
        "AddressDetails.BillingAddress.UnitNumber": "",
        "AddressDetails.BillingAddress.StreetNumber": "",
        "AddressDetails.BillingAddress.StreetName": "",
        "AddressDetails.BillingAddress.StreetType": "",
        "AddressDetails.BillingAddress.Suburb": "",
        "AddressDetails.BillingAddress.AdministrativeArea": "",
        "AddressDetails.BillingAddress.PostalCode": "",
        "AddressDetails.BillingAddress.Country": "",
        "AddressDetails.WorkAddress.POBox": "",
        "AddressDetails.WorkAddress.LevelNumber": "",
        "AddressDetails.WorkAddress.UnitNumber": "",
        "AddressDetails.WorkAddress.StreetNumber": "",
        "AddressDetails.WorkAddress.StreetName": "",
        "AddressDetails.WorkAddress.StreetType": "",
        "AddressDetails.WorkAddress.Suburb": "",
        "AddressDetails.WorkAddress.AdministrativeArea": "",
        "AddressDetails.WorkAddress.PostalCode": "",
        "AddressDetails.WorkAddress.Country": ""
      };

      FillWith.prototype.matchers = [
        new InputMatcher("PersonalDetails.Honorific", (function(_) {
          return _.find("input:regex(name,honorific|prefix|title)").add(_.find("select:regex(name,honorific|prefix|title)")).add(_.find(_.find("label:regex(text:,honorific|prefix|title)").attr("for")));
        }), function(el, v) {
          if ($(el).is("input")) {
            return $(el).val(v);
          } else if ($(el).is("select")) {
            return $(el).children("option").each(function(i, e) {
              var res, titlematch;
              titlematch = new RegExp("^" + escRE(v) + "[^A-Za-z]?$", "gi");
              res = $(e).val().match(titlematch);
              if (!res) {
                return true;
              }
              if (res.length === 1) {
                $(e).prop('selected', true);
                return false;
              } else if (res.length > 1) {
                console.log("Failed Honorific match. Option is:");
                console.log($(e).val());
                return false;
              }
            });
          }
        }), new InputMatcher("PersonalDetails.FirstName", (function(_) {
          return _.find("input:regex(name,((first|given).*name|^name$))").add(_.find(_.find("label:regex(text:,(first|given)\\s*name)").attr("for")));
        }), function(el, v) {
          return $(el).val(v);
        }), new InputMatcher("PersonalDetails.MiddleName", (function(_) {
          return _.find("input:regex(name,middle.*names?)").add(_.find(_.find("label:regex(text:,middle.*names?)").attr("for")));
        }), function(el, v) {
          return $(el).val(v);
        }), new InputMatcher("PersonalDetails.MiddleName", (function(_) {
          return _.find("input:regex(name,((middle.*|^)initials?))").add(_.find(_.find("label:regex(text:,(middle.*|^)initials?)").attr("for")));
        }), function(el, v) {
          return $(el).val(v.substring(0, 1));
        }), new InputMatcher("PersonalDetails.LastName", (function(_) {
          return _.find("input:regex(name,(last|sur).*names?)").add(_.find(_.find("label:regex(text:,(last|sur)\\s*names?)").attr("for")));
        }), function(el, v) {
          return $(el).val(v);
        }), new InputMatcher("PersonalDetails.BirthDate.Day", (function(_) {
          return _.find("input:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(dd|d|day|date)$)").add(_.find("select:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(dd|d|day|date)$)")).add(_.find(_.find("label:regex(text:,(birth.*(day|date)|^dob$|^d\\.o\\.b\\.?$))").attr("for")));
        }), function(el, v) {
          if ($(el).is("input")) {
            return $(el).val(v);
          } else if ($(el).is("select")) {
            return $(el).children("option").each(function(i, e) {
              var daymatch, res;
              daymatch = new RegExp("0?" + escRE(v) + "$", "gi");
              res = $(e).val().match(daymatch);
              if (!res) {
                return true;
              } else if (res.length === 1) {
                $(e).prop('selected', true);
                return false;
              } else if (res.length > 1) {
                console.log("Failed BirthDate.Day match. Option is:");
                console.log($(e).val());
                return false;
              }
            });
          }
        }), new InputMatcher("PersonalDetails.BirthDate.Month", (function(_) {
          return _.find("input:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(mm|m|month)$)").add(_.find("select:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(mm|m|month)$)")).add(_.find(_.find("label:regex(text:,(birth.*(month|mm)|^dob$|^d\\.o\\.b\\.?$))").attr("for")));
        }), function(el, v) {
          if ($(el).is("input")) {
            return $(el).val(v);
          } else if ($(el).is("select")) {
            return $(el).children("option").each(function(i, e) {
              var monthmatch, months_a, res;
              months_a = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
              monthmatch = new RegExp("^0?" + v + "$|^" + months_a[parseInt(v, 10)], "gi");
              res = $(e).val().match(monthmatch);
              if (!res) {
                return true;
              } else if (res.length === 1) {
                $(e).prop('selected', true);
                return false;
              } else if (res.length > 1) {
                console.log("Failed BirthDate.Month match. Option is:");
                console.log($(e).val());
                return false;
              }
            });
          }
        }), new InputMatcher("PersonalDetails.BirthDate.Year", (function(_) {
          return _.find("input:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(yy|y|year)$)").add(_.find("select:regex(name,^(birth|dob|d\\.o\\.b\\.?).*(yy|y|year)$)")).add(_.find(_.find("label:regex(text:,year|^dob$|^d\\.o\\.b\\.?$)").attr("for")));
        }), function(el, v) {
          if ($(el).is("input")) {
            return $(el).val(v);
          } else if ($(el).is("select")) {
            return $(el).children("option").each(function(i, e) {
              var res, yearmatch;
              yearmatch = new RegExp("^" + v + "$", "gi");
              res = $(e).val().match(yearmatch);
              if (!res) {
                return true;
              } else if (res.length === 1) {
                $(e).prop('selected', true);
                return false;
              } else if (res.length > 1) {
                console.log("Failed BirthDate.Year match. Option is:");
                console.log($(e).val());
                return false;
              }
            });
          }
        }), new InputMatcher(["AddressDetails.HomeAddress.LevelNumber", "AddressDetails.HomeAddress.UnitNumber", "AddressDetails.HomeAddress.StreetNumber", "AddressDetails.HomeAddress.StreetName", "AddressDetails.HomeAddress.StreetType", "AddressDetails.HomeAddress.BuildingName"], (function(_) {
          return _.find("input:regex(name,(add|address)($|.*line.*(2|two)))").add(_.find(_.find("label:regex(text:,(?!post.*)(add|address)(?:.*line.*(2|two)))").attr("for")));
        }), function(el, vals) {
          return $(el).val(fillWith.makeAddressLine1(vals));
        })
      ];

      function FillWith(el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$el = $(el);
      }

      return FillWith;

    })();
    return $.fn.extend({
      fillWith: function() {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('fillWith');
          if (!data) {
            $this.data('fillWith', (data = new FillWith(this, option)));
          }
          if (typeof option === 'string') {
            data[option].apply(data, args);
          }
          return $.each(data.matchers, function(_, matcher) {
            var el;
            el = matcher.match($this);
            el.css({
              'background-color': '#00CC99'
            });
            if (matcher.hasFields(data.options)) {
              return matcher.populate(el, data.options);
            } else {
              console.log("fillWith option not found: ");
              return console.log(matcher.names);
            }
          });
        });
      }
    });
  })(window.jQuery, window);

}).call(this);
