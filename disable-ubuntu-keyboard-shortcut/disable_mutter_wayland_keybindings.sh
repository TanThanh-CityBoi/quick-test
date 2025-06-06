#!/bin/bash

# List key shortcut
# org.gnome.mutter.wayland.keybindings
mutter_wayland_keybindings=(
    restore-shortcuts 
    switch-to-session-1
    switch-to-session-10
    switch-to-session-11
    switch-to-session-12
    switch-to-session-2
    switch-to-session-3
    switch-to-session-4
    switch-to-session-5
    switch-to-session-6
    switch-to-session-7
    switch-to-session-8
    switch-to-session-9
)

# Disable shortcuts
for i in ${mutter_wayland_keybindings[@]}
do
    echo -e "excute::__ gsettings set org.gnome.mutter.wayland.keybindings $i "['']" \n"
    gsettings set org.gnome.mutter.wayland.keybindings $i "['']"
done

