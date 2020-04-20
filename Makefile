# Based on: https://gist.github.com/emilbjorklund/77cb39aafd04d60ef1f5

CSS_C=sass
CSS_FLAGS=-I $(SCSS_INCLUDES)
CSS_SRC=scss
SCSS_INCLUDES=$(CSS_SRC)
CSS_OUT=css
CSS_TARGETS_INCLUDING_PARTIALS=$(patsubst $(CSS_SRC)/%.scss,$(CSS_OUT)/%.css,$(wildcard $(CSS_SRC)/*.scss))
SCSS_PARTIALS=$(wildcard $(CSS_SRC)/_*.scss)
SCSS_PARTIALS_AS_CSS=$(patsubst $(CSS_SRC)/%.scss,$(CSS_OUT)/%.css,$(SCSS_PARTIALS))
CSS_TARGETS=$(filter-out $(SCSS_PARTIALS_AS_CSS),$(CSS_TARGETS_INCLUDING_PARTIALS))

.PHONY: all final css clean

all: $(CSS_TARGETS)

final: CSS_FLAGS += -t compact --sourcemap=none
final: all

clean:
	rm -rf $(CSS_OUT)/*

$(CSS_TARGETS): $(CSS_OUT)/%.css : $(CSS_SRC)/%.scss $(SCSS_INCLUDES)/_*.scss | $(CSS_OUT)
	$(CSS_C) $(CSS_FLAGS) $< $@
