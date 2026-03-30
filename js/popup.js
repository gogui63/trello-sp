/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.get('card', 'shared', 'spData')
  .then(function(spData) {
    if (!spData) {
      document.getElementById('setup-title').textContent = 'Estimation initiale (Fibonacci) :';
      document.getElementById('initial-setup').style.display = 'block';
      document.getElementById('decrement-points').style.display = 'none';
      document.getElementById('cancel-setup').style.display = 'none';
    } else {
      document.getElementById('initial-setup').style.display = 'none';
      document.getElementById('decrement-points').style.display = 'block';
      
      var current = spData.current || 0;
      var initial = spData.initial || 1;
      var percentage = Math.min(100, (current / initial) * 100);

      document.getElementById('current-display').textContent = current;
      document.getElementById('initial-display').textContent = initial;
      document.getElementById('progress-bar').style.width = percentage + '%';
    }
  })
  .then(function() {
    t.sizeTo('#content');
  });
});

// Helper to adjust points (delta can be positive or negative)
function performAdjustment(delta, note) {
  if (isNaN(delta) || delta === 0) return Promise.resolve();

  return t.get('card', 'shared', 'spData')
  .then(function(spData) {
    if (!spData) return;

    var newCurrent = Math.max(0, spData.current + delta);
    newCurrent = Math.round(newCurrent * 10) / 10;
    
    var type = delta > 0 ? 'increment' : 'decrement';
    
    spData.current = newCurrent;
    spData.history.push({
      date: new Date().toISOString(),
      change: delta,
      remaining: newCurrent,
      type: type,
      note: note || (type === 'increment' ? 'Points ajoutés' : 'Points consommés')
    });

    return t.set('card', 'shared', 'spData', spData);
  })
  .then(function() {
    t.closePopup();
  });
}

// Event delegation for Fibonacci buttons (Set OR Update Initial)
document.querySelector('.fibonacci-grid').addEventListener('click', function(event) {
  if (event.target.classList.contains('fib-button')) {
    var newInitial = parseInt(event.target.getAttribute('data-value'), 10);
    
    return t.get('card', 'shared', 'spData')
    .then(function(spData) {
      if (!spData) {
        // Initial set
        spData = {
          initial: newInitial,
          current: newInitial,
          history: [{
            date: new Date().toISOString(),
            change: 0,
            remaining: newInitial,
            type: 'set',
            note: 'Estimation initiale définie'
          }]
        };
      } else {
        // Update existing initial
        var oldInitial = spData.initial;
        spData.initial = newInitial;
        spData.history.push({
          date: new Date().toISOString(),
          change: newInitial - oldInitial,
          remaining: spData.current,
          type: 'update-initial',
          note: 'Estimation initiale modifiée (' + oldInitial + ' -> ' + newInitial + ')'
        });
      }
      return t.set('card', 'shared', 'spData', spData);
    })
    .then(function() {
      t.closePopup();
    });
  }
});

// Quick Action buttons
document.querySelectorAll('.btn-quick').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var delta = parseFloat(this.getAttribute('data-val'));
    return performAdjustment(delta, null);
  });
});

document.getElementById('submit-decrement').addEventListener('click', function() {
  var delta = parseFloat(document.getElementById('consume-points').value);
  var note = document.getElementById('consume-note').value;
  return performAdjustment(delta, note);
});

// Toggle to Edit Initial
document.getElementById('edit-initial').addEventListener('click', function() {
  document.getElementById('setup-title').textContent = 'Modifier l\'estimation initiale :';
  document.getElementById('initial-setup').style.display = 'block';
  document.getElementById('decrement-points').style.display = 'none';
  document.getElementById('cancel-setup').style.display = 'block';
  t.sizeTo('#content');
});

document.getElementById('cancel-setup').addEventListener('click', function() {
  document.getElementById('initial-setup').style.display = 'none';
  document.getElementById('decrement-points').style.display = 'block';
  t.sizeTo('#content');
});

document.getElementById('reset-points').addEventListener('click', function() {
  return t.remove('card', 'shared', 'spData')
  .then(function() {
    t.closePopup();
  });
});
