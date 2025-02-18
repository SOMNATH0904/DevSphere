$(document).ready(function () {
  $('.modal').removeClass('hidden');
  goNextTask();

  function goNextTask() {
    var taskCoordXArray = [56, 244, 455];
    var taskCoordYArray = [56, 56, 90];
    var index = $('.nav__btn_active').index() >= 0 ? $('.nav__btn_active').index() + 1 : 0;
    if (index > 0) $('.map__task').eq(index - 1).addClass('map__task_completed');
    if (index == 0) {
      setTimeout(function () {
        $('.map__char').animate({
          top: 56,
          left: 56
        }, {
          duration: 1100,
          easing: 'linear'
        });
        setTimeout(function () {
          $('.nav__btn').eq(index).addClass('nav__btn_active');
          $('.task').eq(index).removeClass('hidden');
          startTask();
        }, 2100);
      }, 1000);
    } else if (index == 4) {
      $('.nav__btn_active').removeClass('nav__btn_active');
      $('.task').addClass('hidden');
      $('.map__char').removeClass('map__char_small');
      $('.map__char').animate({
        top: 156,
        left: 674
      }, {
        duration: 2200,
        easing: 'linear'
      });
      setTimeout(function () {
        $('.map__char').animate({
          top: 156,
          left: 800
        }, {
          duration: 1800,
          easing: 'linear'
        });
      }, 2200);
    } else {
      $('.nav__btn_active').removeClass('nav__btn_active');
      $('.task').addClass('hidden');
      var timeout = 0;
      $('.progress-completed').width(index * 25 + '%');
      switch (index) {
        case 1:
          $('.map__char').animate({
            top: 56,
            left: 244
          }, {
            duration: 2700,
            easing: 'linear'
          });
          timeout = 3700;
          break;
        case 2:
          $('.map__char').animate({
            top: 156,
            left: 464
          }, {
            duration: 3500,
            easing: 'linear'
          });
          setTimeout(function () {
            $('.map__char').animate({
              top: 86,
              left: 494
            }, {
              duration: 1100,
              easing: 'linear'
            });
          }, 3500);
          timeout = 5600;
          break;
        case 3:
          $('.map__char').animate({
            top: 156,
            left: 524
          }, {
            duration: 1100,
            easing: 'linear'
          });
          setTimeout(function () {
            $('.map__char').animate({
              top: 156,
              left: 674
            }, {
              duration: 2200,
              easing: 'linear'
            });
          }, 1100);
          setTimeout(function () {
            $('.map__char').addClass('map__char_small');
            $('.map__char').animate({

              top: 6,
              left: 644
            }, {
              duration: 2200,
              easing: 'linear'
            });
          }, 3300);
          timeout = 6500;
          break;
        default:
          timeout = 3000;
          break;
      }

      setTimeout(function () {
        $('.nav__btn').eq(index).addClass('nav__btn_active');
        $('.task').eq(index).removeClass('hidden');
        startTask();
      }, timeout);
    }
  }

  function showCompletedTask() {
    $('.modal').addClass('modal_show');
    setTimeout(function () {
      $('.modal').removeClass('modal_show');
      goNextTask();
    }, 1500);
  }

  $('.nav__btn').on('click', function () {
    if ($(this).hasClass('nav__btn_active')) return false;
    var prevTask = $('.nav__btn_active').data('task');
    $('.' + prevTask).closest('.task').addClass('hidden');
    $('.nav__btn_active').removeClass('nav__btn_active');
    $(this).addClass('nav__btn_active');
    $('.' + $(this).data('task')).closest('.task').removeClass('hidden');
    // stopping timeout, intervals and animations
    clearTimeout(distributorTimer);
    $('.distributor__block_active .distributor__thumb').stop();

    //
    startTask();
  });

  function startTask() {
    switch ($('.nav__btn_active').data('task')) {
      case 'wires':
        startWires();
        break;
      case 'shooting':
        startShooting();
        break;
      case 'manifolds':
        startManifolds();
        break;
      case 'distributor':
        startDistributor();
        break;
      default:
        break;
    }

  }

  // 
  //    WIRES
  //
  var wiresLeftOffset = $('.wires').offset().left;
  var wiresTopOffset = $('.wires').offset().top;
  var rightWires;

  $('.wires + .task__refresh').on('click', function () {
    startWires();
  });

  function startWires() {
    wiresLeftOffset = $('.wires').offset().left;
    wiresTopOffset = $('.wires').offset().top;
    var rightWiresIndexes = [1, 2, 3, 4];
    shuffle(rightWiresIndexes);
    var _rightWires = [];
    var wiresColors = ['yellow', 'red', 'purple', 'blue'];

    rightWiresIndexes.map(function (item, index) {
      var thisWire = $('.wires__pack_right .wire:nth-child(' + (index + 1) + ')');
      thisWire.removeClass('wire_yellow').removeClass('wire_red').removeClass('wire_purple').removeClass('wire_blue').addClass('wire_' + wiresColors[item - 1]);
      _rightWires.push({
        id: index + 1,
        color: wiresColors[item - 1],
        posX: thisWire.offset().left,
        posY: thisWire.offset().top,
        obj: thisWire
      });
    });
    rightWires = _rightWires;
    $('.wire').removeClass('wire_active').removeClass('wire_set').removeClass('wire_correct').data('connected', '');
    $('.wire path').attr('d', 'M0 0 L0 0 Z');
  }

  $('.wire__connector_left').on('mousedown', function (e) {
    if (e.which != 1) return false;
    var wire = $(this).closest('.wire');
    wire.find('.wire__body path').attr('d', 'M35 ' + (wire.index() * 100 + 80) + ', L' + (e.pageX - wiresLeftOffset) + ' ' + (e.pageY - wiresTopOffset));
    wire.addClass('wire_active').removeClass('wire_set').data('connected', '');

    $(document).on('mousemove.wiresmm', function (e) {
      wire.find('.wire__body path').attr('d', 'M35 ' + (wire.index() * 100 + 80) + ', L' + (e.pageX - wiresLeftOffset) + ' ' + (e.pageY - wiresTopOffset));
      var connected = false;
      rightWires.map(function (item) {
        if (Math.abs(item.posX - e.pageX) <= 30 && Math.abs(item.posY - e.pageY + 50) <= 30) {
          wire.find('.wire__body path').attr('d', 'M35 ' + (wire.index() * 100 + 80) + ', L' + (item.posX - wiresLeftOffset) + ' ' + (item.posY - wiresTopOffset + 50));
          wire.data('connected', item.color);
          connected = true;
          return false;
        }
      });
      if (!connected) {
        wire.data('connected', '');
      }
      checkWires();
    });

    $(document).on('mouseup.wiresmu', function (e) {
      if (e.which != 1) return false;
      wire.find('.wire__body path').attr('d', 'M35 ' + (wire.index() * 100 + 80) + ', L' + (e.pageX - wiresLeftOffset) + ' ' + (e.pageY - wiresTopOffset));
      $(document).off('mousemove.wiresmm').off('mouseup.wiresmu');

      var chosenWire = null;
      rightWires.map(function (item) {
        if (Math.abs(item.posX - e.pageX) <= 30 && Math.abs(item.posY - e.pageY + 50) <= 30) {
          chosenWire = item;
          wire.data('connected', chosenWire.color);
          wire.find('.wire__body path').attr('d', 'M35 ' + (wire.index() * 100 + 80) + ', L' + (chosenWire.posX - wiresLeftOffset) + ' ' + (chosenWire.posY - wiresTopOffset + 50));
          return false;
        }
      });
      wire.removeClass('wire_active');

      if (chosenWire != null) {
        wire.addClass('wire_set');
      } else {
        wire.removeClass('wire_set').find('.wire__body path').attr('d', 'M0 0 L0 0');
      }
      checkWires();
    });
  });

  function checkWires() {
    $('.wires__pack_left .wire').each(function () {
      var correctRightWire = rightWires.find(rw => rw.color == $(this).data('color'));
      if ($(this).data('color') == $(this).data('connected')) {
        correctRightWire.obj.addClass('wire_correct');
      } else {
        correctRightWire.obj.removeClass('wire_correct');
      }
    });
    if ($('.wire_correct').length == 4 && $('.wire_active').length == 0) {
      showCompletedTask();
    }
  }
  // 
  //    WIRES
  //



  // 
  //    SHOOTING
  //
  var shootingLeftOffset = $('.shooting').offset().left;
  var shootingTopOffset = $('.shooting').offset().top;
  var asteroidCounter = 0;
  var asteroidQueueCounter = 1;
  var maxAsteroidCount = 5;
  var reduiredAsteroidNumber = 20;
  var asteroidFlyingTime = 3000;
  var asteroidStatuses = ['idle', 'idle', 'idle', 'idle', 'idle'];
  var asteroidInterval;

  function startShooting() {
    asteroidCounter = 0;
    asteroidStatuses = ['idle', 'idle', 'idle', 'idle', 'idle'];
    if (asteroidInterval != null) {
      clearInterval(asteroidInterval);
    }
    $('.shooting__counter').text('Destroyed: ' + asteroidCounter);
    shootingLeftOffset = $('.shooting').offset().left;
    shootingTopOffset = $('.shooting').offset().top;
    $('.shooting__asteroid').each(function () {
      $(this).stop();
      $(this).css('left', 600);
    });
    $('.shooting__asteroid-wreckage').css('left', 700);
    queueAsteroids();
  }

  function queueAsteroids() {
    asteroidInterval = setInterval(function () {
      if (asteroidCounter < reduiredAsteroidNumber) {
        var asteroid = $('.shooting__asteroid').eq(asteroidQueueCounter);
        if (asteroidStatuses[asteroid.index()] == 'idle') {
          asteroidStatuses[asteroid.index()] = 'flies';
          sendAsteroid(asteroid);
        }
        asteroidQueueCounter++;
        if (asteroidQueueCounter == maxAsteroidCount) asteroidQueueCounter = 0;
      }
    }, 1000);
  }

  function sendAsteroid(asteroid) {
    asteroid.stop();
    asteroid.css('left', 600).css('top', Math.floor(Math.random() * 500));
    var endAngle = Math.floor(Math.random() * 720);
    var top = Math.floor(Math.random() * 500);
    asteroid.animate({
      left: -100,
      top: top
    }, {
      step: function (now, fx) {
        $(this).css('transform', 'translate(-50%, -50%) rotate(' + endAngle * (now + 100) / 700 + 'deg)');
      },
      duration: asteroidFlyingTime
    }, function () {});
    setTimeout(function () {
      asteroidStatuses[asteroid.index()] = 'idle';
    }, asteroidFlyingTime);
  }

  $('.shooting + .task__refresh').on('click', function () {
    startShooting();
  });

  $('.shooting').on('mouseenter', function (e) {
    var cooldown = false;
    $('.shooting__cursor').css('top', e.pageY - shootingTopOffset).css('left', e.pageX - shootingLeftOffset);
    $('.shooting__cursor-rails').find('path').attr('d', 'M0 500 L' + (e.pageX - shootingLeftOffset) + ' ' + (e.pageY - shootingTopOffset) + ' L500 500');

    $('.shooting').on('mousemove.smm', function (e) {
      $('.shooting__cursor').css('top', e.pageY - shootingTopOffset).css('left', e.pageX - shootingLeftOffset);
      $('.shooting__cursor-rails').find('path').attr('d', 'M0 500 L' + (e.pageX - shootingLeftOffset) + ' ' + (e.pageY - shootingTopOffset) + ' L500 500');
    });

    $('.shooting').on('click.sclick', function (e) {
      if (cooldown) return false;
      $('.shooting__explosion').css('top', e.pageY - shootingTopOffset).css('left', e.pageX - shootingLeftOffset).css('--explosion-rotation', Math.floor(Math.random() * 360) + 'deg').removeClass('hidden');
      cooldown = true;
      setTimeout(function () {
        $('.shooting__explosion').addClass('hidden');
      }, 150);
      setTimeout(function () {
        cooldown = false;
      }, 300);
    });

    $(document).on('click.shoot', '.shooting__asteroid', function () {
      var self = this;
      asteroidCounter++;
      $('.shooting__counter').text('Destroyed: ' + asteroidCounter);
      $(self).stop();
      var index = $(self).index();
      asteroidStatuses[index] = 'idle';
      setTimeout(function () {
        $('.shooting__asteroid-wreckage:nth-child(' + (maxAsteroidCount + 1 + index) + ')').css('left', $(self).css('left')).css('top', $(self).css('top')).css('transform', 'translate(-50%, -50%) rotate(' + Math.floor(Math.random() * 360) + 'deg)');
        $(self).css('left', 600);
      }, 50);
      setTimeout(function () {
        $('.shooting__asteroid-wreckage:nth-child(' + (maxAsteroidCount + 1 + index) + ')').css('left', 700);
      }, 350);
      if (asteroidCounter == reduiredAsteroidNumber) {
        showCompletedTask();
        $('.shooting__asteroid').each(function () {
          $(this).stop();
          $(this).css('left', 600);
        });
      }
    });

    $('.shooting').on('mouseleave.sml', function () {
      $('.shooting').off('mousemove.smm').off('mouseleave.sml').off('click.sclick');
      $(document).off('click.shoot');
    });

  });
  // 
  //    SHOOTING
  //


  // 
  //    Manifolds
  //
  var manifoldsCounter = 1;
  var manifoldsBlocked = false;

  function startManifolds() {
    manifoldsCounter = 1;
    $('.manifolds__button').remove();
    var mans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    shuffle(mans);
    mans.forEach(function (item) {
      $('.manifolds__panel').append('<button type="button" class="manifolds__button">' + item + '</button>');
    });
  }

  $(document).on('click', '.manifolds__button', function () {
    if (manifoldsBlocked) return false;
    if (manifoldsCounter != $(this).text()) {
      manifoldsCounter = 1;
      manifoldsBlocked = true;
      $('.manifolds__button_active').removeClass('manifolds__button_active');
      $('.manifolds__panel').addClass('manifolds__panel_wrong');
      setTimeout(function () {
        $('.manifolds__panel_wrong').removeClass('manifolds__panel_wrong');
        manifoldsBlocked = false;
      }, 500);
      return false;
    }
    $(this).toggleClass('manifolds__button_active');
    manifoldsCounter++;
    if (manifoldsCounter > 10) {
      showCompletedTask();
    }
  });

  // 
  //    Manifolds
  //



  // 
  //    Distributor
  //
  var distributorNumber = 1;
  var distributorTimer;
  var distributorRotateTime = 3000;
  var distributorRotatedCount = 0;

  function startDistributor() {
    distributorNumber = 1;
    $('.distributor__block').removeClass('distributor__block_active').removeClass('distributor__block_set');
    $('.distributor__thumb').stop();
    $('.distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
    $('.distributor__btn').prop('disabled', false);
    launchDistributor();
  }

  function launchDistributor() {
    clearTimeout(distributorTimer);
    distributorRotatedCount = 0;
    distributorRotateTime = 3000;
    $('.distributor__left-panel .distributor__block').removeClass('distributor__block_active');
    $('.distributor__left-panel .distributor__block:nth-child(' + (distributorNumber + 1) + ')').addClass('distributor__block_active');
    $('.distributor__block_active .distributor__thumb').stop();
    $('.distributor__block_active .distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
    startDistributorRotation();
    distributorTimer = setTimeout(startDistributorRotation, distributorRotateTime > 0 ? distributorRotateTime : 3000);
  }

  function startDistributorRotation() {
    clearTimeout(distributorTimer);
    $('.distributor__block_active .distributor__thumb').animate({
      'margin-right': 100
    }, {
      step: function (now, fx) {
        var angle = now / 100 * 360;
        $('.distributor__block_active .distributor__thumb').css('transform', 'translate(0px, -5px) rotate(calc(-150deg - ' + angle + 'deg))');
        if (Math.abs(angle - 120) <= 10) {
          $('.distributor__block:nth-child(' + (distributorNumber + 1) + ')').addClass('distributor__block_set');
        } else {
          $('.distributor__block:nth-child(' + (distributorNumber + 1) + ')').removeClass('distributor__block_set');
        }
      },
      duration: distributorRotateTime > 0 ? distributorRotateTime : 3000,
      easing: 'linear',
      complete: function () {
        $('.distributor__block_active .distributor__thumb').css('margin-right', '').css('transform', 'translate(0px, -5px) rotate(-150deg)');
        distributorRotatedCount++;
      }
    });

    distributorTimer = setTimeout(startDistributorRotation, distributorRotateTime);
    distributorRotatedCount++;
    if (distributorRotatedCount == 1) {
      distributorRotateTime = 4000;
    } else if (distributorRotatedCount > 1) {
      distributorRotateTime = 5000;
    }
  }

  $('.distributor__btn').on('click', function () {
    if ($(this).closest('.distributor__block').hasClass('distributor__block_set') && distributorNumber == $(this).closest('.distributor__block').index()) {
      clearTimeout(distributorTimer);
      $('.distributor__block_active .distributor__thumb').stop();
      $('.distributor__block_active .distributor__thumb').css('transform', 'translate(0px, -5px) rotate(-270deg)');
      distributorNumber++;
      if (distributorNumber == 4) {
        showCompletedTask();
      }
      launchDistributor();
      $(this).prop('disabled', true);
    } else {
      startDistributor();
      $(this).prop('disabled', false);
    }
  });

  //
  //     Distributor
  //
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}