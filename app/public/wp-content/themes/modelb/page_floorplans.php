<?php

/** Template Name: Floorplans */

get_header();
?>

<?php if (get_field('disable_page_header') == false) : ?>
  <header id="page-header">
    <?php $bkg = get_field('page_image'); ?>
    <div id="page-image" style="background-image:url('<?= $bkg ?>')">
    </div>
  </header>
<?php endif; ?>

<script>
  window.env = {
    apiToken: '<?= the_field('apiToken') ?>',
    companyCode: '<?= the_field('companyCode') ?>',
    marketingAPIKey: '<?= the_field('marketingAPIKey') ?>',
    propertyId: '<?= the_field('propertyId') ?>'
  }
</script>

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
<?php $comp_root = 'adt-floorplans' ?>
<div id="<?= $comp_root ?>"></div>

<script type='text/babel'>
  const {  
    WoodmontComponents: { FloorplansTemplate }, ReactDOM 
  } = WoodmontJS

  const template_container = document.getElementById('<?= $comp_root ?>')
  ReactDOM.render(<FloorplansTemplate />, template_container)
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