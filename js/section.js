/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.get('card', 'shared', 'spData')
  .then(function(spData) {
    var stats = document.getElementById('stats');
    var noHistory = document.getElementById('no-history');
    var table = document.getElementById('history-table');
    var body = document.getElementById('history-body');

    if (!spData || !spData.history || spData.history.length === 0) {
      stats.style.display = 'none';
      table.style.display = 'none';
      noHistory.style.display = 'block';
      return;
    }

    noHistory.style.display = 'none';
    stats.style.display = 'flex';
    table.style.display = 'table';
    
    // Update stats cards
    document.getElementById('stat-initial').textContent = spData.initial;
    document.getElementById('stat-current').textContent = spData.current;
    document.getElementById('stat-consumed').textContent = (spData.initial - spData.current).toFixed(1).replace('.0', '');

    body.innerHTML = '';

    // Sort history by date descending
    var sortedHistory = spData.history.slice().reverse();

    sortedHistory.forEach(function(entry) {
      var row = document.createElement('tr');
      
      var dateCell = document.createElement('td');
      var dateObj = new Date(entry.date);
      dateCell.textContent = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dateCell.style.color = '#5e6c84';
      dateCell.style.fontSize = '12px';
      
      var actionCell = document.createElement('td');
      var actionBadge = document.createElement('span');
      actionBadge.className = 'sp-badge ' + (entry.type || 'decrement');
      
      if (entry.type === 'set') {
        actionBadge.textContent = 'INIT ' + entry.remaining;
      } else if (entry.type === 'update-initial') {
        var prefix = entry.change >= 0 ? '+' : '';
        actionBadge.textContent = 'INITIAL ' + prefix + entry.change;
      } else if (entry.type === 'increment') {
        actionBadge.textContent = '+' + Math.abs(entry.change) + ' SP';
      } else {
        actionBadge.textContent = '-' + Math.abs(entry.change) + ' SP';
      }
      actionCell.appendChild(actionBadge);
      
      var noteCell = document.createElement('td');
      noteCell.textContent = entry.note || '-';
      noteCell.style.fontStyle = entry.note ? 'normal' : 'italic';
      noteCell.style.color = entry.note ? 'inherit' : '#9fadbc';
      
      var remainingCell = document.createElement('td');
      remainingCell.textContent = entry.remaining + ' SP';
      remainingCell.style.fontWeight = '600';
      
      row.appendChild(dateCell);
      row.appendChild(actionCell);
      row.appendChild(noteCell);
      row.appendChild(remainingCell);
      body.appendChild(row);
    });
  })
  .then(function() {
    t.sizeTo('#history-content');
  });
});
