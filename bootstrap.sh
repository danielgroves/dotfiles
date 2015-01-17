#!/usr/bin/env bash

BASE_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

FILES=(.aliases .atom .bash_profile .bash_prompt .bashrc .extra .functions .gitattributes .gitconfig .gitignore .gitk .profile)

for i in "${FILES[@]}"
do
	FILE=${i}
	PATH=${BASE_DIR}/${FILE}
	HOME_PATH=${HOME}/${FILE}
	echo "Mapping ${PATH} to ${HOME_PATH}"
	/bin/rm -Rf ${HOME_PATH}
	/bin/ln -s ${PATH} ${HOME_PATH}
done

export PATH=/bin:/usr/bin:${PATH}


echo "Configuring terminal..."
defaults write com.apple.terminal StringEncodings -array 4
TERM_PROFILE="terminal-ocean-dark"
CURRENT_PROFILE="$(defaults read com.apple.terminal 'Default Window Settings')";
if [ "${CURRENT_PROFILE}" != "${TERM_PROFILE}" ]; then
	open "${BASE_DIR}/${TERM_PROFILE}.terminal"
	sleep 1;
	defaults write com.apple.terminal 'Default Window Settings' -string "${TERM_PROFILE}"
	defaults write com.apple.terminal 'Startup Window Settings' -string "${TERM_PROFILE}"
fi;
echo "Done."

