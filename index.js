var options = {};

var player = videojs("my-video", options, function onPlayerReady() {
  videojs.log("Your player is ready!");
});

function handleQualitySwitch() {
  player.src("hq.mp4");
  return restorePlaybackSettings(player);
}

function restorePlaybackSettings(player) {
  const currentTime = player.currentTime();
  const playbackRate = player.playbackRate();
  const isPaused = player.paused();

  return new Promise((resolve, reject) => {
    const handleTimeUpdate = () => {
      player.currentTime(currentTime);
      player.playbackRate(playbackRate);

      if (isPaused) {
        resolve();
      } else {
        player.play() ? player.play().then(resolve).catch(reject) : null;
      }
    };

    player.one("timeupdate", handleTimeUpdate);
  });
}
