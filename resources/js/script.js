document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(document.getElementById('toast')) {
            document.getElementById('toast').style.display = 'none';
        }
    }, 2000);
});


/* import Filterizr from 'filterizr'
const options = {
    animationDuration: 0.5, // in seconds
    callbacks: { 
      onFilteringStart: function() { },
      onFilteringEnd: function() { },
      onShufflingStart: function() { },
      onShufflingEnd: function() { },
      onSortingStart: function() { },
      onSortingEnd: function() { }
    },
    controlsSelector: '', // Selector for custom controls
    delay: 0, // Transition delay in ms
    delayMode: 'progressive', // 'progressive' or 'alternate'
    easing: 'ease-out',
    filter: 'all', // Initial filter
    filterOutCss: { // Filtering out animation
      opacity: 0,
      transform: 'scale(0.5)'
    },
    filterInCss: { // Filtering in animation
      opacity: 0,
      transform: 'scale(1)'
    },
    gridItemsSelector: '.filtr-container',
    gutterPixels: 0, // Items spacing in pixels
    layout: 'sameSize', // See layouts
    multifilterLogicalOperator: 'or',
    searchTerm: '',
    setupControls: true, // Should be false if controlsSelector is set 
    spinner: { // Configuration for built-in spinner
      enabled: false,
      fillColor: '#2184D0',
      styles: {
        height: '75px',
        margin: '0 auto',
        width: '75px',
        'z-index': 2,
      },
    },
  } 

const filtro = new Filterizr('.filter-container', options)
console.log(filtro) */