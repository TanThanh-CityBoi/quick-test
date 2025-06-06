#!/bin/bash


# disable super key
gsettings set org.gnome.mutter overlay-key ''


# disable shortcuts 

# org.gnome.desktop.wm.keybindings
./disable_desktop_vm_keybindings.sh

# org.gnome.shell.keybindings
./disable_shell_keybindings.sh

# org.gnome.mutter.keybindings
./disable_mutter_keybindings.sh

# org.gnome.mutter.wayland.keybindings
./disable_mutter_wayland_keybindings.sh

# org.gnome.settings-daemon.plugins.media-keys
./disable_plugins_mediakeys.sh


# Make sure changes take effect immediately
setsid gnome-shell --replace >/dev/null 2>&1 &