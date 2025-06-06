#!/bin/bash

# List key shortcut
# org.gnome.settings-daemon.plugins.media-keys
media_keys=(
    battery-status-static
    calculator-static
    control-center-static
    eject-static
    email-static
    help
    hibernate-static
    home-static
    keyboard-brightness-down-static
    keyboard-brightness-toggle-static
    keyboard-brightness-up-static
    logout
    magnifier
    magnifier-zoom-in
    magnifier-zoom-out
    media-static
    mic-mute-static
    next-static
    pause-static
    play-static
    playback-forward-static
    playback-random-static
    playback-repeat-static
    playback-rewind-static
    power-static
    previous-static
    rfkill-bluetooth-static
    rfkill-static
    rotate-video-lock-static
    screen-brightness-cycle-static
    screen-brightness-down-static
    screen-brightness-up-static
    screenreader
    screensaver
    screensaver-static
    search-static
    stop-static
    suspend-static
    terminal
    touchpad-off-static
    touchpad-on-static
    touchpad-toggle-static
    volume-down-precise-static
    volume-down-quiet-static
    volume-down-static
    volume-mute-quiet-static
    volume-mute-static
    volume-up-precise-static
    volume-up-quiet-static
    volume-up-static
    www-static
)

# Disable shortcuts
for i in ${media_keys[@]}
do
    echo -e "excute::__ gsettings set org.gnome.settings-daemon.plugins.media-keys $i "['']" \n"
    gsettings set org.gnome.settings-daemon.plugins.media-keys $i "['']"
done

