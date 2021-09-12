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
                        "name": "Fiori",        
                        "code": "001",       
                        "desc": "SAP Fiori",
                        "maxnum": "7"
                    },  {
                        "name": "SAPUI5",        
                        "code": "002",       
                        "desc": "SAP SAPUI5",
                        "maxnum": "7"
                    },  {
                        "name": "CDS VIEW",        
                        "code": "003",       
                        "desc": "SAP CDS VIEW",
                        "maxnum": "7"
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
                console.log(arg);
                var oProPerty = this.getModel("oProPerty");
                this._buttonInit(oProPerty);

                switch(arg){
                    case "display":
                        oProPerty.setProperty("/readMode", true); 
                        oProPerty.setProperty("/editMode", true); 
                        oProPerty.setProperty("/saveMode", false); 
                        oProPerty.setProperty("/deleteMode", false);
                    break;
                    case "edit":
                        oProPerty.setProperty("/readMode", false); 
                        oProPerty.setProperty("/editMode", true); 
                        oProPerty.setProperty("/saveMode", true); 
                        oProPerty.setProperty("/deleteMode", true);
                    break;      
                                                     
                }


            },

            /**
             * 초기화
             */
            _buttonInit : function (oUi) {
                oUi.setProperty("/readMode", true); // 조회 버튼 클릭시 화면에 노출됩니다. 
                oUi.setProperty("/editMode", true); // 조회 버튼 클릭시 수정 할수 있도록 기능을 노출 합니다.
                oUi.setProperty("/saveMode", true); // 조회 버튼 클릭시에는 수정모드가 아니기 때문에 화면에 노출하지 않습니다. 
                oUi.setProperty("/deleteMode", true);
            },

            getModel : function (sName) {
			    return this.getView().getModel(sName);
		    },

            setModel : function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            }
       
		});
	});
