#!/bin/bash

# List all schemas under org:
gsettings list-schemas | grep -i gnome
# List all keybindings
gsettings list-recursively org.gnome.desktop.wm.keybindings | grep Super
gsettings list-recursively org.gnome.shell.keybindings
gsettings list-recursively org.gnome.mutter.keybindings
gsettings list-recursively org.gnome.mutter.wayland.keybindings
gsettings list-recursively org.gnome.settings-daemon.plugins.media-keys