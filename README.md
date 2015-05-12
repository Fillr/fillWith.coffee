# fillWith.coffee

##Initialisation:

Copy the below and paste in the console of your favourite form.

    (function(d, t, c) {
        var g = d.createElement(t), 
            s = d.getElementsByTagName(t)[0];
        for (var i in c) {
          g.src = c[i]; 
          s.parentNode.insertBefore(g, s);
        }
    }(document, 'script', ['https://code.jquery.com/jquery-1.11.3.js','https://raw.githubusercontent.com/alphabetsoup/fillWith.coffee/master/init.js']));

Some examples of good forms to fillWith.coffee are:

 - [https://www.qantas.com.au/fflyer/do/dyns/joinff]
 - [https://info.bpiexpressonline.com/bpiprod/eolappli.nsf/CreditCardApplicationForm?OpenForm]
 - [http://www.garnier.com.au/register]

##Usage:

    jQuery("#myPage").fillWith options

where

    options =
        "PersonalDetails.Honorific" : "Mr."
        "PersonalDetails.FirstName" : "Steve"
        "PersonalDetails.MiddleName" : "McQueen"
        "PersonalDetails.LastName" : ""
        "PersonalDetails.BirthDate.Day" : ""
        "PersonalDetails.BirthDate.Month" : ""
        "PersonalDetails.BirthDate.Year" : ""
        "ContactDetails.Emails.Email.Address" : ""
        "AddressDetails.HomeAddress.LevelNumber" : ""
        "AddressDetails.HomeAddress.UnitNumber" : ""
        "AddressDetails.HomeAddress.StreetNumber" : ""
        "AddressDetails.HomeAddress.StreetName" : ""
        "AddressDetails.HomeAddress.StreetType" : ""
        "AddressDetails.HomeAddress.Suburb" : ""
        "AddressDetails.HomeAddress.AdministrativeArea" : ""
        "AddressDetails.HomeAddress.PostalCode" : ""
        "AddressDetails.HomeAddress.Country" : ""
        "AddressDetails.HomeAddress.BuildingName" : ""
        "AddressDetails.PostalAddress.POBox" : ""
        "AddressDetails.PostalAddress.LevelNumber" : ""
        "AddressDetails.PostalAddress.UnitNumber" : ""
        "AddressDetails.PostalAddress.StreetNumber" : ""
        "AddressDetails.PostalAddress.StreetName" : ""
        "AddressDetails.PostalAddress.StreetType" : ""
        "AddressDetails.PostalAddress.Suburb" : ""
        "AddressDetails.PostalAddress.AdministrativeArea" : ""
        "AddressDetails.PostalAddress.PostalCode" : ""
        "AddressDetails.PostalAddress.Country" : ""
        "AddressDetails.PostalAddress.BuildingName" : ""
        "AddressDetails.BillingAddress.POBox" : ""
        "AddressDetails.BillingAddress.LevelNumber" : ""
        "AddressDetails.BillingAddress.UnitNumber" : ""
        "AddressDetails.BillingAddress.StreetNumber" : ""
        "AddressDetails.BillingAddress.StreetName" : ""
        "AddressDetails.BillingAddress.StreetType" : ""
        "AddressDetails.BillingAddress.Suburb" : ""
        "AddressDetails.BillingAddress.AdministrativeArea" : ""
        "AddressDetails.BillingAddress.PostalCode" : ""
        "AddressDetails.BillingAddress.Country" : ""
        "AddressDetails.WorkAddress.POBox" : ""
        "AddressDetails.WorkAddress.LevelNumber" : ""
        "AddressDetails.WorkAddress.UnitNumber" : ""
        "AddressDetails.WorkAddress.StreetNumber" : ""
        "AddressDetails.WorkAddress.StreetName" : ""
        "AddressDetails.WorkAddress.StreetType" : ""
        "AddressDetails.WorkAddress.Suburb" : ""
        "AddressDetails.WorkAddress.AdministrativeArea" : ""
        "AddressDetails.WorkAddress.PostalCode" : ""
        "AddressDetails.WorkAddress.Country" : ""
