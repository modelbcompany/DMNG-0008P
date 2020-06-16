<?php

/** Template Name: Floorplans */

// RENTCafé API Credentials
$RENT_CAFE_AUTH = json_encode((object) array(
  'apiToken' => get_field('apiToken'),
  'companyCode' => get_field('companyCode'),
  'marketingAPIKey' => get_field('marketingAPIKey'),
  'propertyId' => get_field('propertyId')
));

// <FloorplansTemplate /> container ID
$FLOORPLANS_TEMPLATE_CONTAINER_ID = 'adt-floorplans';

get_header();
?>

<?php if (get_field('disable_page_header') == false) : ?>
  <header id="page-header">
    <?php $bkg = get_field('page_image'); ?>
    <div id="page-image" style="background-image:url('<?= $bkg ?>')">
    </div>
  </header>
<?php endif; ?>

<!-- Page Title -->
<div id="page-title">
  <h1><?php the_title() ?></h1>
</div>

<!-- Page Content -->
<div id="content" class="subpage">
  <div class="row">
    <div class="inner-content grid-x grid-margin-x grid-padding-x">
      <main class="main small-12 large-12 medium-12 cell" role="main">

        <div class="page-description">
          <h2 style="text-align: center;">
            <?php the_field('page_description_heading') ?>
          </h2>
          <p style="text-align: center;">
            <?php the_field('page_description_text') ?>
          </p>
        </div>
      </main>
    </div>
  </div>
</div>

<!-- REACT -->
<div id="<?= $FLOORPLANS_TEMPLATE_CONTAINER_ID ?>"></div>

<script type='text/babel'>
  const { WoodmontComponents: { FloorplansTemplate }, ReactDOM } = WoodmontJS

  // TODO: Call Woodmont API and pass data to template component

  ReactDOM.render(
    <FloorplansTemplate auth={JSON.parse('<?= $RENT_CAFE_AUTH ?>')} />, 
    document.getElementById('<?= $FLOORPLANS_TEMPLATE_CONTAINER_ID ?>')
  )
</script>
<!-- END REACT -->


<div class="subpage">
  <?php
  $prefooter_hidden = get_field('hide_prefooter');
  $prefooter = get_field('global_prefooter', 'option');

  if (!$prefooter_hidden and $prefooter) :
  ?>
    <!-- Prefooter -->
    <div class="row">
      <?php the_field('prefooter', 'option'); ?>
    </div>
  <?php endif; ?>
</div>

<!-- Footer -->
<?php get_footer(); ?>