#
# Makefile - gather javascripts and compress it
#

CORE_FILES = \
  src/stackbase.js \
  src/system/set.js \
  src/system/write.js \
  src/system/pair.js \
  src/system/value.js \
  src/system/symbol.js \
  src/system/char.js \
  src/system/number.js \
  src/system/port.js \
  src/system/record.js \
  src/system/hashtable.js \
  src/system/syntax.js \
  src/system/types.js \
  src/system/parser.js \
  src/system/compiler.js \
  src/system/pause.js \
  src/system/call.js \
  src/system/interpreter.js \
  src/library/infra.js \
  src/library/r6rs_lib.js \
  src/library/webscheme_lib.js \
  src/library/extra_lib.js \
  src/library/srfi.js

RELEASE_FILES = \
  src/console/web-console.js \
  src/prototype.js \
  $(CORE_FILES) \
  src/dumper.js \
  src/release_initializer.js
  #src/io.js

CONSOLE_FILES0 =					\
  src/prototype.js				\
  src/stackbase.js				\
  src/system/set.js				\
  src/system/write.js				\
  src/system/pair.js				\
  src/system/value.js				\
  src/system/symbol.js				\
  src/system/char.js				\
  src/system/number.js				\
  src/system/port.js				\
  src/system/hashtable.js			\
  src/system/syntax.js				\
  src/system/types.js				\
  src/system/parser.js				\
  src/system/compiler.js			\
  src/system/pause.js				\
  src/system/call.js				\
  src/system/interpreter.js			\
  src/library/infra.js				\
  src/library/r6rs_lib.js			\
  src/library/webscheme_lib.js \
  src/library/extra_lib.js			\
  src/library/srfi.js				\
  src/dumper.js					\
  \
  $(NULL)

VERSION_FILE_IN = src/version.js.in
VERSION_FILE    = src/version.js

all: folder lib/biwascheme.js lib/release_biwascheme.js lib/console_biwascheme.js

folder:
	@mkdir -p lib

build: lib/biwascheme.js lib/console_biwascheme.js bin/biwas

$(VERSION_FILE): $(VERSION_FILE_IN) $(FILES0) $(CONSOLE_FILES0) VERSION Makefile
	cat $< | sed -e "s/@GIT_COMMIT@/`git log -1 --pretty=format:%H`/" | sed -e "s/@VERSION@/`cat VERSION`/" > $@

lib/biwascheme.js: $(VERSION_FILE) $(CORE_FILES)
	cat $^ | yui-compressor --type js -o $@
	@echo "Wrote " $@

lib/release_biwascheme.js: $(VERSION_FILE) $(CORE_FILES)
	cat $^ | yui-compressor --type js -o $@
	@echo "Wrote " $@

bin/biwas: src/console/node-console.js lib/console_biwascheme.js src/node_main.js
	echo '#!/usr/bin/env node' > $@
	cat src/console/node-console.js >> $@
	cat lib/console_biwascheme.js >> $@
	cat src/node_main.js >> $@
	chmod +x $@
	@echo "Wrote " $@
