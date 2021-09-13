sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("com.sfc.databind.controller.App", {
			onInit: function () {

                var oJSONModel =  new JSONModel({    
                    "Student": {     
                        "id": "001",        
                        "name": "Neo",       
                        "phone": "010-2265-0000",
                        "Addresss": "SAP Fiori Cafe"
                    },
                    "StudyType" : [{
                        "title": "Fiori",        
                        "code": "001",       
                        "desc": "SAP Fiori",
                        "maxnum": "7"
                    },  {
                        "title": "SAPUI5",        
                        "code": "002",       
                        "desc": "SAP SAPUI5",
                        "maxnum": "5"
                    },  {
                        "title": "CDS VIEW",        
                        "code": "003",       
                        "desc": "SAP CDS VIEW",
                        "maxnum": "6"
                        }                                                                                        
                    ]  
                });
                
                this.getView().setModel(oJSONModel);

                var oinputName = this.byId("inputName");             
                oinputName.bindElement("/Student");
                oinputName.bindProperty("value", "name");

                var oProPerty =   new JSONModel({ 
                                    readMode : true,
                                    editMode : false,
                                    saveMode : false,
                                    deleteMode : false
                                });

                this.setModel(oProPerty, "oProPerty"); //  "oProPerty"  이름으로 Model을  등록 합니다.
            },

            onButtonPress(arg){

                sap.m.MessageToast.show(arg);

                var oProPerty = this.getModel("oProPerty");

                this._buttonInit(oProPerty);

                switch(arg){
                    case "display":
                        oProPerty.setProperty("/editMode", true); 
                    break;
                    case "edit": 
                        oProPerty.setProperty("/readMode", true); 
                        oProPerty.setProperty("/saveMode", true); 
                        oProPerty.setProperty("/deleteMode", true);
                    break;      
                    case "save":
                        oProPerty.setProperty("/readMode", true); 
                        break;
                    break;                                      
                }
            },

            /**
             * 초기화
             */
            _buttonInit : function (oUi) {
                oUi.setProperty("/readMode", false); 
                oUi.setProperty("/editMode", false); 
                oUi.setProperty("/saveMode", false); 
                oUi.setProperty("/deleteMode", false);
            },

            getModel : function (sName) {
			    return this.getView().getModel(sName);
		    },

            setModel : function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            }
       
		});
	});
