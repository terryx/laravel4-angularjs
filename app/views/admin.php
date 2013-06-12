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
        <ul class="nav">
            <li><a data-ng-href="/logout"><i class="icon-off icon-white"></i></a></li>
        </ul>
        <div class="container">
            <a class="brand" href="/admin">Control</a>
            <ul class="nav">
                <li class="divider-vertical"></li>
                <li class="dropdown">
                    <a href="#" id="videoLink" role="button" class="dropdown-toggle" data-toggle="dropdown">Video <b
                            class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="videoLink">
                        <li><a role="menuitem" tabindex="-1" data-ng-href="/protected/video/feeds">Feeds</a></li>
                        <li><a role="menuitem" tabindex="-1" data-ng-href="/protected/video/add">Add</a></li>
                    </ul>
                </li>
            </ul>

        </div>
    </div>
</div>
<div class="push-top"></div>
<div class="container">
    <div id="view" data-ng-view></div>
</div>

<script src="/js/api.min.js"></script>
<script src="/js/service.min.js"></script>
<script src="/js/controller/video.min.js"></script>
<script src="/js/admin.min.js"></script>
</body>
</html>