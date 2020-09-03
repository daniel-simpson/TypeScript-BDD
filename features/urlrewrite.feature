@rewrite
Feature: Redirect testing

    Scenario Outline: Testing rewrite <LiveUrl>
        * "<RewriteUrl>" and "<TargetUrl>" have the same page content
        Examples:
            | RewriteUrl | TargetUrl | RewriteStatusCode |
#| /contact   | /contact/ | 301               |