#!/bin/bash

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
