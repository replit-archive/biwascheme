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

CONSOLE_FILES = \
  src/prototype.js \
  src/stackbase.js \
  $(CORE_FILES) \
  src/dumper.js

VERSION_FILE_IN = src/version.js.in
VERSION_FILE    = src/version.js

all: lib/biwascheme.js lib/release_biwascheme.js lib/console_biwascheme.js

$(VERSION_FILE): $(VERSION_FILE_IN) $(RELEASE_FILES) $(CONSOLE_FILES) Makefile
	cat $< | sed -e "s/@GIT_COMMIT@/`git log -1 --pretty=format:%H`/" | sed -e "s/@VERSION@/`cat VERSION`/" > $@

lib/biwascheme.js: $(VERSION_FILE) $(CORE_FILES)
	cat $^ | java -jar bin/yuicompressor-2.4.2.jar --type js -o $@
	@echo "Wrote " $@

lib/release_biwascheme.js: $(VERSION_FILE) $(CORE_FILES)
	cat $^ | java -jar bin/yuicompressor-2.4.2.jar --type js -o $@
	@echo "Wrote " $@

lib/console_biwascheme.js: $(VERSION_FILE) $(CORE_FILES)
	cat $^ | java -jar bin/yuicompressor-2.4.2.jar --type js -o $@
	@echo "Wrote " $@

clean:
	rm $(VERSION_FILE) lib/biwascheme.js lib/release_biwascheme.js lib/console_biwascheme.js
