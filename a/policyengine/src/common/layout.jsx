import { Fragment, default as React } from 'react'
import { Row, Col, Container } from "react-bootstrap";
import { PageHeader, Tag, Divider, BackTop, Tabs, Affix } from "antd";
import { Switch, Route, Link, BrowserRouter as Router, useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, RedditOutlined, TwitterOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export function generateURLParams(page, policy) {
	let searchParams = new URLSearchParams(window.location.search);
	for (const key in policy) {
		if (policy[key].value !== policy[key].default) {
			if(policy[key].type === "rate") {
				searchParams.set(key, Math.round(+policy[key].value * 100));
			} else {
				searchParams.set(key, +policy[key].value);
			}
		} else {
			searchParams.delete(key);
		}
	}
	const url = `${page || "/"}?${searchParams.toString()}`;
	return url;
}

export function getPolicyFromURL(defaultPolicy) {
	let plan = defaultPolicy;
	const { searchParams } = new URL(document.location);
	for (const key of searchParams.keys()) {
		plan[key].value = +searchParams.get(key) / (defaultPolicy[key].type == "rate" ? 100 : 1);
	}
	return plan;
}

export function Title(props) {
	const tags = props.beta ? [<Tag key="beta" color="#002766">BETA</Tag>] : null;
	const title = <><a href="/" style={{color: "white"}}>PolicyEngine<sub style={{fontSize: "50%"}}>{props.country}</sub></a></>;
	return (
		<div style={{minWidth: 300}}>
			<div className="d-none d-lg-block">
				<PageHeader
					title={title}
					style={{minHeight: 40}}
					tags={tags}
				/>
			</div>
			<div className="d-lg-none">
				<div className="d-flex justify-content-center">
					<PageHeader
						title={title}
						style={{paddingBottom: 8}}
						tags={tags}
					/>
				</div>
			</div>
		</div>
	);
}

export function Footer() {
	return (
		<div style={{paddingBottom: 25}}>
			<BackTop />
			<Divider style={{marginTop: 50}} />
			<div className="d-none d-lg-block">
				<div className="d-flex justify-content-center">
					<p style={{textAlign: "center"}}><a href="https://policyengine.org">PolicyEngine © 2021</a> | <a href="/faq">FAQ</a> | <a href="https://zej8fnylwn9.typeform.com/to/XFFu15Xq">Share your feedback</a> | <a href="https://opencollective.com/psl">Donate</a></p>
				</div>
			</div>
			<div className="d-flex d-lg-none justify-content-center">
				<SocialLinks color="black"/>
			</div>
			<div className="d-block d-lg-none">
				<p style={{textAlign: "center"}}><a href="https://policyengine.org">PolicyEngine © 2021</a> | <a href="/faq">FAQ</a></p>
				<p style={{textAlign: "center"}}><a href="https://zej8fnylwn9.typeform.com/to/XFFu15Xq">Share your feedback</a> | <a href="https://opencollective.com/psl">Donate</a></p>
			</div>
		</div>
	)
}

export function PolicyEngine(props) {
	return (
		<Router>
			<Container style={{padding: 0}} fluid>
				{props.children}
			</Container>
		</Router>
	);
}

function SocialLinks(props) {
	const iconStyle = { marginTop: 25, marginBottom: 25, marginLeft: 15, fontSize: 15, color: props.color || "white" };
	return (
		<div className="d-flex justify-content-center">
			<a href="https://twitter.com/thepolicyengine"><TwitterOutlined style={iconStyle}/></a>
			<a href="https://www.facebook.com/ThePolicyEngine"><FacebookOutlined style={iconStyle}/></a>
			<a href="https://www.linkedin.com/company/thepolicyengine/about/"><LinkedinOutlined style={iconStyle} href="https://twitter.com"/></a>
			<a href="https://www.reddit.com/user/PolicyEngine"><RedditOutlined style={iconStyle} /></a>
			<a href="https://www.instagram.com/policyengine/"><InstagramOutlined style={iconStyle}/></a>
		</div>
	);
}

function MainNavigation(props) {
	const history = useHistory();
	let middleColumn;
	if(props.faq) {
		middleColumn = (
			<Tabs activeKey={props.selected} centered onChange={key => {history.push(generateURLParams("/" + key, props.policy))}}>
				<TabPane tab="FAQ" key="faq"/>
			</Tabs>
		);
	} else {
		middleColumn = (
			<Tabs activeKey={props.selected} centered onChange={key => {history.push(generateURLParams("/" + key, props.policy))}}>
				<TabPane tab="Policy" key=""/>
				<TabPane tab={(props.country || "UK") + " impact"} key="population-impact" />
				<TabPane tab="Your household" key="household" />
				{props.household ? <TabPane tab="Household impact" key="household-impact" /> : null}
			</Tabs>
		);
	}
	return (
		<>
			<Row style={{margin: 0}}>
				<Col lg={2}>
					<Title image={props.titleImage} country={props.country} beta={props.beta} />
				</Col>
				<Col lg={8} style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10}}>
					{middleColumn}
				</Col>
				<Col lg={2} className="d-none d-lg-block">
					<SocialLinks />
				</Col>
			</Row>
		</>
	);
}

export function Header(props) {
	return (
		<Affix offsetTop={0}>
			<div style={{backgroundColor: "#002766"}}>
				<Switch>
					<Route path="/" exact>
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="" />
					</Route>
					<Route path="/population-impact">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="population-impact" />
					</Route>
					<Route path="/population-results">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="population-impact" />
					</Route>
					<Route path="/household">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="household" />
					</Route>
					<Route path="/situation">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="household" />
					</Route>
					<Route path="/household-impact">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="household-impact" />
					</Route>
					<Route path="/situation-results">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} selected="household-impact" />
					</Route>
					<Route path="/faq">
						<MainNavigation beta={props.beta} country={props.country} policy={props.policy} household={props.household} faq/>
					</Route>
				</Switch>
			</div>
		</Affix>
	);
}

export function Responsive(props) {
	return (
		<>
			<div className="d-none d-lg-block">
				<Container fluid>{props.children}</Container>
			</div>
			<div className="d-block d-lg-none">
				<Container style={{marginTop: 20}}>{props.children}</Container>
			</div>
		</>
	);
}