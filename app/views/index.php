<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html" ng-app="App">
<head>
    <meta charset="utf-8">
    <title>Test Server</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noodp, noydir">
    <meta name="description" content="TerryX personal blog">
    <meta name="author" content="Terry Yuen">

    <base href="/">
    <link rel="shortcut icon" href="/img/v.png">
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/momentjs/2.0.0/moment.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-sanitize.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-resource.min.js"></script>

    <script src="/bootstrap/js/ui-bootstrap-tpls-0.2.0.min.js"></script>
</head>
<body data-ng-cloak>
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="/">Main</a>
            <ul class="nav">
                <li class="divider-vertical"></li>
            </ul>

            <form class="navbar-search form-search pull-right" ng-submit="search(query)"
                  ng-controller="SearchController">
                <div class="input-append">
                    <input type="text" ng-model="query" class="search-query" placeholder="Search for youtube video..."/>
                    <button type="submit" class="btn"><span class="icon icon-search"></span></button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="push-top"></div>
<div class="container">
    <div id="view" data-ng-view></div>
</div>

<script src="/js/api.min.js"></script>
<script src="/js/service.min.js"></script>
<script src="/js/app.min.js"></script>
</body>
</html>