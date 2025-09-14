#!/bin/bash

# Script para facilitar commits em português
# Uso: ./commit-pt.sh "feat: adiciona nova funcionalidade"

if [ $# -eq 0 ]; then
    echo "Uso: $0 \"<mensagem do commit>\""
    echo "Exemplo: $0 \"feat: adiciona nova funcionalidade\""
    exit 1
fi

git commit -m "$1"
