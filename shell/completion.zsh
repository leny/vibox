if [[ ! -o interactive ]]; then
    return
fi

compctl -K _vibox_complete vibox

_vibox_complete() {
  local word words completions
  read -cA words
  word="${words[2]}"

  if [ "${#words}" -eq 2 ]; then
    completions="$(vibox commands)"
  else
    completions="$(vibox completions "${word}")"
  fi

  reply=("${(ps:\n:)completions}")
}
