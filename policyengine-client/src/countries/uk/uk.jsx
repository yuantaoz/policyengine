/*
 * Parameters for the UK app.
*/

import UBICenterLogo from "../../images/ubicenter.png"
import Country from "../country";
import AutoUBI from "./components/autoUBI";
import ExtraBand from "./components/extraBand";
import TimeTravel from "./components/timeTravel";

const childNamer = {
    1: "Your first child",
    2: "Your second child",
    3: "Your third child",
    4: "Your fourth child",
    5: "Your fifth child",
}

function validatePolicy(policy, defaultPolicy) {
    if(defaultPolicy) {
        for(let parameter in policy) {
            policy[parameter].defaultValue = defaultPolicy[parameter].value;
        }
    }
    if(policy.higher_threshold.value === policy.add_threshold.value) {
        policy.higher_threshold.error = "The higher rate threshold must be different than the additional rate threshold.";
        policy.add_threshold.error = "The additional rate threshold must be different than the higher rate threshold.";
        return {policy: policy, policyValid: false};
    } else {
        policy.higher_threshold.error = null;
        policy.add_threshold.error = null;
    }
    return {policy: policy, policyValid: true};
}

export class UK extends Country {
    name = "uk"
    properName = "UK"
    beta = false
    // Pages to show
    showPolicy = true
    showPopulationImpact = true
    showHousehold = true
    showFAQ = true
    // Vanity URLs
    namedPolicies = {
        "/ubi-labs/resilience-ubi": "WA_adult_UBI_age=16&adult_UBI=184&child_UBI=92&senior_UBI=184&abolish_CB=1&abolish_CTC=1&abolish_ESA_income=1&abolish_IS=1&abolish_JSA_income=1&abolish_PC=1&abolish_SP=1&abolish_UC_carer=1&abolish_UC_child=1&abolish_UC_childcare=1&abolish_UC_standard=1&abolish_WTC=1&personal_allowance=0&higher_threshold=50000&add_rate=60&basic_rate=35&higher_rate=55&NI_add_rate=10&NI_class_4_add_rate=10&NI_class_4_main_rate=10&NI_main_rate=10",
        "/ubi-labs/covid-dividend": "child_UBI=46&adult_UBI=92&senior_UBI=46&WA_adult_UBI_age=16"
    }
    // Policy page metadata
    extraParameterMetadata = {}
    parameterHierarchy = {
        "General": [
            "timeTravel",
        ],
        "Tax": {
            "Income Tax": {
                "Labour income": [
                    "basic_rate",
                    "higher_rate",
                    "higher_threshold",
                    "add_rate",
                    "add_threshold",
                    "extra_UK_band",
                ],
                "Scottish rates": [
                    "scottish_starter_rate",
                    "scottish_starter_threshold",
                    "scottish_basic_rate",
                    "scottish_basic_threshold",
                    "scottish_intermediate_rate",
                    "scottish_intermediate_threshold",
                    "scottish_higher_rate",
                    "scottish_higher_threshold",
                    "scottish_add_rate",
                    "scottish_add_threshold",
                    "extra_scot_band",
                ],
                "Allowances": [
                    "personal_allowance",
                    "PA_reduction_threshold",
                    "PA_reduction_rate",
                    "marriage_allowance_cap",
                    "abolish_marriage_allowance_income_condition"
                ],
                "Structural": [
                    "abolish_income_tax"
                ]
            },
            "National Insurance": {
                "Employee": [
                    "NI_main_rate",
                    "NI_PT",
                    "NI_add_rate",
                    "NI_UEL",
                ],
                "Self-employed": [
                    "NI_LPL",
                    "NI_class_4_main_rate",
                    "NI_UPL",
                    "NI_class_4_add_rate"
                ],
                "Structural": [
                    "abolish_NI"
                ]
            },
            "Property taxes": [
                "abolish_CT",
                "abolish_sdlt",
                "abolish_ltt",
                "abolish_lbtt",
                "abolish_business_rates",
            ]
        },
        "Benefit": {
            "Child Benefit": [
                "abolish_CB",
                "CB_eldest",
                "CB_additional",
                "CB_takeup",
                "CB_HITC_reduction_threshold",
                "CB_HITC_reduction_rate",
            ],
            "Legacy benefits": [
                "abolish_CTC",
                "CTC_takeup",
                "abolish_WTC",
                "WTC_takeup",
                "abolish_HB",
                "HB_takeup",
                "abolish_IS",
                "IS_takeup",
                "abolish_JSA_income",
                "JSA_IB_takeup",
                "abolish_ESA_income",
            ],
            "State Pension": [
                "abolish_SP",
                "abolish_PC",
                "PC_takeup",
            ],
            "Universal Credit": [
                "abolish_UC",
                "abolish_UC_standard",
                "UC_single_young",
                "UC_single_old",
                "UC_couple_young",
                "UC_couple_old",
                "abolish_UC_child",
                "abolish_UC_disability",
                "abolish_UC_carer",
                "abolish_UC_housing_costs",
                "abolish_UC_childcare",
                "UC_work_allowance_without_housing",
                "UC_work_allowance_with_housing",
                "UC_reduction_rate",
            ],
        },
        "UBI Center": {
            "Universal Basic Income": [
                "child_UBI",
                "adult_UBI",
                "senior_UBI",
                "WA_adult_UBI_age",
                "taxable_UBI",
                "means_test_UBI",
                "autoUBI",
            ],
            "Land Value Tax": [
                "LVT",
                "household_lvt",
                "corporate_lvt",
            ],
            "Carbon Tax": [
                "carbon_tax",
                "carbon_tax_consumer_incidence",
            ]
        }
    }
    defaultOpenParameterGroups = [
        "/Tax",
    ]
    defaultSelectedParameterGroup = "/Tax/Income Tax/Labour income"
    organisations = {
        "UBI Center": {
            logo: UBICenterLogo,
        },
	}
    // OpenFisca data
    apiURL = "http://localhost:5000/uk/api"
    parameters = null
    entities = null
    variables = null
    // Adjustments to OpenFisca data
    parameterComponentOverrides = {
        autoUBI: <AutoUBI />,
        extra_UK_band: <ExtraBand 
            rate_parameter="extra_UK_rate" 
            threshold_parameter="extra_UK_threshold"
        />,
        extra_scot_band: <ExtraBand 
            rate_parameter="extra_scot_rate" 
            threshold_parameter="extra_scot_threshold"
        />,
        timeTravel: <TimeTravel />,
    }
    extraVariableMetadata = {}
    validatePolicy = validatePolicy
    situation = {
        "people": {
            "You": {
                "age": {"2021": 25}
            },
        },
        "benunits": {
            "Your family": {
                "adults": ["You"],
                "children": [],
            }
        },
        "households": {
            "Your household": {
                "adults": ["You"],
                "children": [],
            }
        }
    }
    inputVariables = [
        "age",
        "is_in_startup_period",
        "limited_capability_for_WRA",
        "weekly_hours",
        "employment_income",
        "self_employment_income",
        "pension_income",
        "state_pension",
        "dividend_income",
        "property_income",
        "savings_interest_income",
        "is_married",
        "region",
        "food_and_non_alcoholic_beverages_consumption",
        "alcohol_and_tobacco_consumption",
        "clothing_and_footwear_consumption",
        "housing_water_and_electricity_consumption",
        "household_furnishings_consumption",
        "health_consumption",
        "transport_consumption",
        "communication_consumption",
        "recreation_consumption",
        "education_consumption",
        "restaurants_and_hotels_consumption",
        "miscellaneous_consumption",
        "council_tax",
        "owned_land",
        "main_residence_value",
        "other_residential_property_value",
        "non_residential_property_value",
        "corporate_wealth",
    ]
    outputVariables = [
        "household_tax",
        "household_benefits",
        "household_market_income",
        "household_net_income",
        "tax",
        "benefits",
        "market_income",
        "net_income",
        "universal_credit",
        "working_tax_credit",
        "child_tax_credit",
        "housing_benefit",
        "ESA_income",
        "income_support",
        "JSA_income",
        "child_benefit",
        "income_tax",
        "national_insurance",
        "expected_sdlt",
        "expected_ltt",
        "expected_lbtt",
        "business_rates",
    ]
    inputVariableHierarchy = {
        "General": [],
        "Demographic": {
            "Personal" : [
                "age",
                "is_in_startup_period",
                "limited_capability_for_WRA",
                "weekly_hours",
            ],
            "Family": [
                "is_married",
            ],
            "Household": [
                "region"
            ]
        },
        "Income": [
            "employment_income",
            "self_employment_income",
            "pension_income",
            "state_pension",
            "dividend_income",
            "property_income",
            "savings_interest_income",
        ],
        "Consumption": {
            "Family": ["benunit_rent"],
            "Household": [
                "food_and_non_alcoholic_beverages_consumption",
                "alcohol_and_tobacco_consumption",
                "clothing_and_footwear_consumption",
                "housing_water_and_electricity_consumption",
                "household_furnishings_consumption",
                "health_consumption",
                "transport_consumption",
                "communication_consumption",
                "recreation_consumption",
                "education_consumption",
                "restaurants_and_hotels_consumption",
                "miscellaneous_consumption",
                "council_tax",
            ]
        },
        "Wealth": [
            "owned_land",
            "main_residence_value",
            "other_residential_property_value",
            "non_residential_property_value",
            "corporate_wealth",
        ],
    }
    defaultOpenVariableGroups = []
    defaultSelectedVariableGroup = "/General"
    outputVariableHierarchy = {
        "net_income": {
            "add": [
                "market_income",
                "benefits",
            ],
            "subtract": [
                "tax",
            ]
        },
        "market_income": {
            "add": [
                "employment_income",
                "self_employment_income",
                "pension_income",
                "state_pension",
                "dividend_income",
                "property_income",
                "savings_interest_income",
            ]
        },
        "benefits": {
            "add": [
                "universal_credit",
                "working_tax_credit",
                "child_tax_credit",
                "housing_benefit",
                "ESA_income",
                "income_support",
                "JSA_income",
                "child_benefit",
            ]
        },
        "tax": {
            "add": [
                "income_tax",
                "national_insurance",
                "council_tax",
                "expected_sdlt",
                "expected_ltt",
                "expected_lbtt",
                "business_rates",
            ]
        }
    }

    addPartner(situation) {
        situation.people["Your partner"] = {
            "age": {"2021": 25},
        };
        situation.benunits["Your family"].adults.push("Your partner");
        situation.households["Your household"].adults.push("Your partner");
        return this.validateSituation(situation).situation;
    }
    
    addChild(situation) {
        const childName = childNamer[situation.benunits["Your family"].children.length + 1];
        situation.people[childName] = {
            "age": {"2021": 10},
        };
        situation.benunits["Your family"].children.push(childName);
        situation.households["Your household"].children.push(childName);
        return this.validateSituation(situation).situation;
    }
    
    removePerson(situation, name) {
        for(let benunit of Object.keys(situation.benunits)) {
            if(situation.benunits[benunit].adults.includes(name)) {
                situation.benunits[benunit].adults.pop(name);
            }
            if(situation.benunits[benunit].children.includes(name)) {
                situation.benunits[benunit].children.pop(name);
            }
        }
        if(situation.households["Your household"].adults.includes(name)) {
            situation.households["Your household"].adults.pop(name);
        }
        if(situation.households["Your household"].children.includes(name)) {
            situation.households["Your household"].children.pop(name);
        }
        delete situation.people[name];
        return this.validateSituation(situation).situation;
    }
    
    setNumAdults(numAdults) {
        let situation = this.situation;
        const numExistingAdults = situation.households["Your household"].adults.length;
        if(numExistingAdults === 1 && numAdults === 2) {
            situation = this.addPartner(situation);
        } else if(numExistingAdults === 2 && numAdults === 1) {
            situation = this.removePerson(situation, "Your partner");
        }
        this.setState({situation: this.validateSituation(situation).situation, situationIsOutdated: true})
    }

    getNumAdults() {
        return this.situation.households["Your household"].adults.length;
    }
    
    setNumChildren(numChildren) {
        let situation = this.situation;
        const numExistingChildren = situation.households["Your household"].children.length;
        if(numExistingChildren < numChildren) {
            for(let i = numExistingChildren; i < numChildren; i++) {
                situation = this.addChild(situation);
            }
        } else if(numExistingChildren > numChildren) {
            for(let i = numExistingChildren; i > numChildren; i--) {
                situation = this.removePerson(situation, childNamer[i]);
            }
        }
        this.setState({situation: this.validateSituation(situation).situation, situationIsOutdated: true});
    }

    getNumChildren() {
        return this.situation.households["Your household"].children.length;
    }
};
