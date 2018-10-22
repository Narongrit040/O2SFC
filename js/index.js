document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
      .innerHTML = event.tabItem.getAttribute('label');
  });
  document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
      };
      page.querySelector('#push-button2').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page3.html', {data: {title: 'Page 3'}});
      };
    } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }else if (page.id === 'page3') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });


