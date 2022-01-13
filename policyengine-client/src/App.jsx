/*
    * This file contains the top-level logic: directing as per the URL
    * up to the /country page.
*/

import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/policyengine.less";
import PolicyEngine from "./policyengine/policyengine";
import createRedirects from "./policyengine/tools/namedPolicies";
import { UK, US } from "./countries";
import MarkdownPage from "./policyengine/pages/markdown";

// Markdown files

import UK_FAQ from "./markdown/uk/faq.md";
import ABOUT from "./markdown/about.md";
// Import other markdown files here


export default function App(props) {
    const uk = new UK();
    const us = new US();
    const markdownPages = [
        { content: UK_FAQ, path: "/uk/faq", title: "FAQ" },
        { content: UK_FAQ, path: "/about", title: "About" },
        // Add other pages here
    ];
    return (
        <Router>
            <Switch>
                {markdownPages.map(page => (
                    <Route key={page.path} exact path={page.path}>
                        <MarkdownPage title={page.title} content={page.content} path={page.path} />
                    </Route>
                ))}
                <Route exact path="/">
                    <Redirect to="/uk/policy" />
                </Route>
                <Route exact path="/uk">
                    <Redirect to="/uk/policy" />
                </Route>
                <Route exact path="/us">
                    <Redirect to="/us/household" />
                </Route>
                <Route path="/uk">
                    {createRedirects(uk.namedPolicies, "uk")}
                    <PolicyEngine country="uk" analytics={props.analytics} />
                </Route>
                <Route path="/us">
                    {createRedirects(us.namedPolicies, "us")}
                    <PolicyEngine country="us" analytics={props.analytics} />
                </Route>
            </Switch>
        </Router>
    );
}
