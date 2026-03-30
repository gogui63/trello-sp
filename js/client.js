/* global TrelloPowerUp */

var ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-02d0-4da2-8827-5f5e88b29983%2Ficon-gray.svg';

TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'spData')
    .then(function(spData) {
      if (!spData || spData.current === undefined) {
        return [];
      }
      return [{
        text: spData.current.toString() + ' SP',
        color: spData.current > 0 ? 'blue' : 'green',
      }];
    });
  },
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'spData')
    .then(function(spData) {
      if (!spData || spData.current === undefined) {
        return [];
      }
      return [{
        title: 'Story Points',
        text: spData.current.toString() + ' / ' + spData.initial.toString(),
        color: spData.current > 0 ? 'blue' : 'green',
        callback: function(t) {
          return t.popup({
            title: 'Manage Story Points',
            url: './popup.html',
          });
        }
      }];
    });
  },
  'card-buttons': function(t, options) {
    return [{
      icon: ICON,
      text: 'Story Points',
      callback: function(t) {
        return t.popup({
          title: 'Manage Story Points',
          url: './popup.html',
        });
      }
    }];
  },
  'card-back-section': function(t, options) {
    return {
      title: 'Story Points History',
      icon: ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 230
      }
    };
  }
});
