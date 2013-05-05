#!/usr/bin/env bash

_vibox_complete() {
    COMPREPLY=()
    local word="${COMP_WORDS[COMP_CWORD]}"

    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=( $(compgen -W "$(vibox commands)" -- "$word") )
    else
        local command="${COMP_WORDS[1]}"
        local completions="$(vibox completions "$command")"
        COMPREPLY=( $(compgen -W "$completions" -- "$word") )
    fi
}

complete -F _vibox_complete vibox
