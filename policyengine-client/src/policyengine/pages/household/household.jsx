import React from "react";
import { Row, Col } from "react-bootstrap";
import { CountryContext } from "../../../countries";
import Menu from "./menu";
import { VariableControlPane } from "./inputPane";
import AccountingTable from "./accountingTable";
import EarningsChartsPane from "./earningsCharts";
import { OverviewHolder, PolicyOverview, SharePolicyLinks } from "../policy/overview";
import NavigationButton from "../../general/navigationButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Affix } from "antd";
import HelpButton from "../../general/help";

export class Household extends React.Component {
    static contextType = CountryContext;
    constructor(props, context) {
        super(props);
        this.state = {
            selected: context.defaultSelectedVariableGroup
        }
    }

	getVariables() {
        try {
            const parts = this.state.selected.split("/").slice(1);
            let node = this.context.inputVariableHierarchy;
            for(const item of parts) {
                try {
                    node = node[item];
                } catch(e) {
                    node = this.context.outputVariableHierarchy[item];
                }
            }
            return node;
        } catch(e) {
            return [];
        }
	}
    render() {
        const parts = this.state.selected.split("/").slice(1);
        const inputSelected = Object.keys(this.context.inputVariableHierarchy).includes(parts[0]);
        let middlePane;
        if(inputSelected) {
            middlePane = <VariableControlPane 
                selected={this.state.selected} 
                variables={this.getVariables()} 
            />;
        } else if(this.state.selected === "results") {
            middlePane = <AccountingTable />;
        } else if(this.state.selected === "earnings") {
            middlePane = <EarningsChartsPane />;
        }
        return <>
            <HelpButton />
            <Row>
                <Col xl={3}>
                    <Menu selectVariableGroup={group => this.setState({selected: group})} />
                </Col>
                <Col xl={6}>
                    {middlePane}
                </Col>
                <Col>
                    <OverviewHolder>
                        <Affix offsetTop={55}>
                            <PolicyOverview />
				        </Affix>
                        <Affix offsetTop={450}>
                            <SharePolicyLinks page="household"/>
                            <div className="d-block align-middle">
                                <div className="justify-content-center">
                                    <NavigationButton
                                        text="Calculate your net income"
                                        onClick={() => this.setState({selected: "results"})}
                                        primary
                                    />
                                </div>
                                <div className="justify-content-center">
                                    <NavigationButton
                                        target="policy" 
                                        text={<><ArrowLeftOutlined /> Edit your policy</>}
                                    />
                                </div>
                                <div className="justify-content-center">
                                    {this.context.showPopulationImpact && <NavigationButton 
                                        target="population-impact" 
                                        text={<><ArrowLeftOutlined /> Return to the {this.context.properName} impact</>}
                                    />}
                                </div>
                            </div>
                        </Affix>
                    </OverviewHolder>
                </Col>
            </Row>
        </>
    }
}