<?php

/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section
 */

global $wp;
$current_url = home_url(add_query_arg(array(), $wp->request));
$DEV_ENV = strpos($current_url, 'woodmont.local');

$WOODMONT_CDN_URL = $DEV_ENV
  ? '/wp-content/themes/modelb/assets/js/lib/woodmont-1.0.0-alpha.js'
  : 'https://woodbook.modelb.now.sh/woodmont-1.0.0-alpha.js'
?>

<!doctype html>

<html class="no-js" <?php language_attributes(); ?>>

<head>
  <meta charset="utf-8">

  <!-- Force IE to use the latest rendering engine available -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Mobile Meta -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta class="foundation-mq">

  <!-- If Site Icon isn't set in customizer -->
  <?php if (!function_exists('has_site_icon') || !has_site_icon()) { ?>
    <!-- Icons & Favicons -->
    <link rel="icon" href="<?php the_field('favicon', 'option'); ?>">
    <link href="<?php the_field('favicon', 'option'); ?>" rel="apple-touch-icon" />
  <?php } ?>

  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

  <!-- BEGIN WORDPRESS HEAD -->

  <?php wp_head(); ?>

  <!-- END WORDPRESS HEAD -->

  <!-- BEGIN TEMPLATE STYLES -->

  <?php get_template_part('style'); ?>

  <!-- END TEMPLATE STYLES -->

  <!-- Normalize -->
  <link href="https://unpkg.com/@csstools/normalize.css" rel="stylesheet" />

  <!-- Material Icons (Outlined Theme) -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">

  <!-- Font Awesome Free -->
  <script src="https://kit.fontawesome.com/51f4b7d93a.js" crossorigin="anonymous"></script>

  <!-- Swiss 721 -->
  <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/ea5e2124-bbdb-4e91-8a98-9b549b432fdb.css" />

  <!-- IBM Plex Mono -->
  <link type="text/css" rel="stylesheet" href="//fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;300;400;500;600;700&display=swap" />

  <!-- Woodmont Theme Styles -->
  <?php if ($DEV_ENV) : ?>
    <link type="text/css" rel="stylesheet" href="/wp-content/themes/modelb/assets/styles/woodmont.dev.css" />
  <?php else : ?>
    <link type="text/css" rel="stylesheet" href="https://woodbook.modelb.now.sh/assets/css/woodmont.css" />
  <?php endif ?>

  <!-- Babel -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>

  <!-- React -->
  <?php if ($DEV_ENV) : ?>
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <?php else : ?>
    <script src="https://unpkg.com/react@16/umd/react.production.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.js" crossorigin></script>
  <?php endif ?>

  <!-- WoodmontJS -->
  <script src="<?= $WOODMONT_CDN_URL ?>" type='text/babel'></script>
</head>

<body <?php body_class(); ?>>

  <header id="header">
    <div class="row">

      <div class="inner-content grid-x grid-margin-x grid-padding-x">

        <div class="main small-12 large-12 medium-12 cell" role="main">

          <script src="https://textus.rentcafe.com/js/TextUsWidget.js" id="myScript" DNIS="XXXXXXXXXX"></script>
          <a href="https://woodmontstage.wpengine.com/"><img src="/wp-content/uploads/2020/04/8001-woodmont-logo.png" id="logo" /></a>
          <div id="property-info">
            <p>8001 WOODMONT AVENUE | BETHESDA, MD 20814 | 240.333.7649</p>
          </div>
          <div id="nav-menu">
            <div class="menu-main-container">
              <ul id="menu-main" class="menu">
                <li id="menu-item-464" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-464"><a target="_blank" rel="noopener noreferrer" href="https://jbg-reslisting.securecafe.com/onlineleasing/1221-van/oleapplication.aspx?stepname=RentalOptions&amp;myOlePropertyId=568854&amp;FloorPlanID=2275959&amp;UnitID=10944781&amp;header=1">APPLY NOW</a></li>
                <li id="menu-item-465" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-465"><a target="_blank" rel="noopener noreferrer" href="https://jbg-reslisting.securecafe.com/residentservices/1221-van/userlogin.aspx">RESIDENT LOGIN</a></li>
                <li id="menu-item-584" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-584 "><?php echo do_shortcode(' [sg_popup id="638" event="click"]Schedule a Tour[/sg_popup]'); ?> </li>



              </ul>
            </div>
          </div>
        </div>



      </div>
    </div>
  </header>