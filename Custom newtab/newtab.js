document.getElementById('settings').addEventListener('click', function() {
  var settingsContainer = document.getElementById('settingsContainer');
  settingsContainer.style.display = 'none';
});

document.addEventListener('keydown', function(event) {
  var settingsContainer = document.getElementById('settingsContainer');
  if (event.key === 'Escape') {
    settingsContainer.style.display = 'none';
  }
});


document.getElementById('bgTab').addEventListener('click', function() {
  document.getElementById('bgContent').style.display = 'block';
  document.getElementById('clockContent').style.display = 'none';
});

document.getElementById('clockTab').addEventListener('click', function() {
  document.getElementById('bgContent').style.display = 'none';
  document.getElementById('clockContent').style.display = 'block';
});

document.getElementById('setBg').addEventListener('click', function() {
  let url = document.getElementById('bgUrl').value;
  if (url) {
    chrome.storage.sync.set({'bgUrl': url}, function() {
      displayMessage('Background updated!', 2000);
    });
  }
});

document.getElementById('twentyFourHourClock').addEventListener('change', function() {
  chrome.storage.sync.set({'twentyFourHourClock': this.checked}, function() {
    displayMessage('Clock setting updated!', 2000);
  });
});

document.getElementById('setFont').addEventListener('click', function() {
  let fontFamily = document.getElementById('fontFamily').value;
  if (fontFamily) {
    chrome.storage.sync.set({'fontFamily': fontFamily}, function() {
      displayMessage('Font updated!', 2000);
    });
  }
});

document.getElementById('showSeconds').addEventListener('change', function() {
  chrome.storage.sync.set({'showSeconds': this.checked}, function() {
    displayMessage('Clock setting updated!', 2000);
  });
});

document.getElementById('clockSize').addEventListener('input', function() {
  let clockSize = this.value;
  chrome.storage.sync.set({'clockSize': clockSize}, function() {
    displayMessage('Clock size updated!', 2000);
  });
});

document.getElementById('clockColor').addEventListener('input', function() {
  let clockColor = this.value;
  chrome.storage.sync.set({'clockColor': clockColor}, function() {
    displayMessage('Clock color updated!', 2000);
  });
});

// Update the clock
function updateClock() {
  chrome.storage.sync.get(['showSeconds', 'twentyFourHourClock', 'clockSize', 'clockColor'], function(items) {
    let now = new Date();
    let hours = items.twentyFourHourClock ? now.getHours() : now.getHours() % 12 || 12;
    let timeString = hours + ':' + ('0' + now.getMinutes()).slice(-2);
    if (items.showSeconds) {
      timeString += ':' + ('0' + now.getSeconds()).slice(-2);
    }
    document.getElementById('clock').innerHTML = timeString;
    document.getElementById('clock').style.fontSize = items.clockSize + 'em';
    document.getElementById('clock').style.color = items.clockColor;
    setTimeout(updateClock, 1000);
  });
}

// Load settings
chrome.storage.sync.get(['bgUrl', 'fontFamily', 'showSeconds', 'twentyFourHourClock', 'clockSize', 'clockColor'], function(items) {
  if (items.bgUrl) {
    document.body.style.backgroundImage = 'url(' + items.bgUrl + ')';
  }
  if (items.fontFamily) {
    document.getElementById('clock').style.fontFamily = items.fontFamily;
  }
  if (items.fontFamily) {
    document.getElementById('clock').style.fontFamily = items.fontFamily;
  }
  document.getElementById('showSeconds').checked = items.showSeconds;
  document.getElementById('twentyFourHourClock').checked = items.twentyFourHourClock;
  document.getElementById('clockSize').value = items.clockSize || 5;
  document.getElementById('clockColor').value = items.clockColor || '#ffffff';
  updateClock();
});

// Tab functionality
document.getElementById('bgTab').addEventListener('click', function() {
  document.getElementById('bgContent').style.display = 'block';
  document.getElementById('clockContent').style.display = 'none';
});

document.getElementById('clockTab').addEventListener('click', function() {
  document.getElementById('bgContent').style.display = 'none';
  document.getElementById('clockContent').style.display = 'block';
});

// Show settings when gear is clicked
document.getElementById('settings').addEventListener('click', function() {
  document.getElementById('settingsContainer').style.display = 'block';
});

// Save settings
document.getElementById('setBg').addEventListener('click', function() {
  let url = document.getElementById('bgUrl').value;
  if (url) {
    chrome.storage.sync.set({ 'bgUrl': url }, function() {
      displayMessage('Background updated! Please reload the page for the background to take effect.', 0);
    });
  }
});

function displayMessage(message, duration) {
  var messageContainer = document.getElementById('messageContainer');
  messageContainer.innerText = message;
  messageContainer.style.display = 'block';

  if (duration > 0) {
    setTimeout(function() {
      messageContainer.style.display = 'none';
    }, duration);
  }
}


document.getElementById('setFont').addEventListener('click', function() {
  let fontFamily = document.getElementById('fontFamily').value;
  chrome.storage.sync.set({'fontFamily': fontFamily}, function() {
    displayMessage('Font updated!', 2000);
  });
});

document.getElementById('showSeconds').addEventListener('change', function() {
  chrome.storage.sync.set({'showSeconds': this.checked}, function() {
    displayMessage('Clock setting updated!', 2000);
  });
});

document.getElementById('twentyFourHourClock').addEventListener('change', function() {
  chrome.storage.sync.set({'twentyFourHourClock': this.checked}, function() {
    displayMessage('Clock setting updated!', 2000);
  });
});

document.getElementById('clockSize').addEventListener('input', function() {
  let clockSize = this.value;
  chrome.storage.sync.set({'clockSize': clockSize}, function() {
    displayMessage('Clock size updated!', 2000);
  });
});

document.getElementById('clockColor').addEventListener('input', function() {
  let clockColor = this.value;
  chrome.storage.sync.set({'clockColor': clockColor}, function() {
    displayMessage('Clock color updated!', 2000);
  });
});

