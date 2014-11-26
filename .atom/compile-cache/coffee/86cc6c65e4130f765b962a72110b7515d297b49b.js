(function() {
  var latexmk, path;

  path = require("path");

  latexmk = require("./latexmk");

  module.exports = {
    configDefaults: {
      texPath: "$PATH:/usr/texbin",
      outputDirectory: "",
      enableShellEscape: false
    },
    activate: function() {
      return atom.workspaceView.command("latex:build", (function(_this) {
        return function() {
          return _this.build();
        };
      })(this));
    },
    build: function() {
      var args, editor, file, proc;
      editor = atom.workspace.activePaneItem;
      file = editor != null ? editor.buffer.file : void 0;
      if (file == null) {
        return;
      }
      if (editor.isModified()) {
        editor.save();
      }
      args = latexmk.constructArgs(file.path);
      proc = latexmk.run(args, (function(_this) {
        return function(statusCode) {
          if (statusCode === 0) {
            return _this.showResult();
          } else {
            return _this.showError("TeXification failed! Check the log file for more info...");
          }
        };
      })(this));
    },
    showResult: function() {
      if (!atom.inSpecMode()) {
        return console.info("Success!");
      }
    },
    showError: function(error) {
      if (!atom.inSpecMode()) {
        return console.error(error);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLG1CQUFUO0FBQUEsTUFDQSxlQUFBLEVBQWlCLEVBRGpCO0FBQUEsTUFFQSxpQkFBQSxFQUFtQixLQUZuQjtLQURGO0FBQUEsSUFLQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixhQUEzQixFQUEwQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFDLEVBRFE7SUFBQSxDQUxWO0FBQUEsSUFRQSxLQUFBLEVBQU8sU0FBQSxHQUFBO0FBQ0wsVUFBQSx3QkFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBeEIsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxvQkFBTyxNQUFNLENBQUUsTUFBTSxDQUFDLGFBRHRCLENBQUE7QUFFQSxNQUFBLElBQU8sWUFBUDtBQUVFLGNBQUEsQ0FGRjtPQUZBO0FBTUEsTUFBQSxJQUFpQixNQUFNLENBQUMsVUFBUCxDQUFBLENBQWpCO0FBQUEsUUFBQSxNQUFNLENBQUMsSUFBUCxDQUFBLENBQUEsQ0FBQTtPQU5BO0FBQUEsTUFPQSxJQUFBLEdBQU8sT0FBTyxDQUFDLGFBQVIsQ0FBc0IsSUFBSSxDQUFDLElBQTNCLENBUFAsQ0FBQTtBQUFBLE1BUUEsSUFBQSxHQUFPLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWixFQUFrQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxVQUFELEdBQUE7QUFDdkIsVUFBQSxJQUFHLFVBQUEsS0FBYyxDQUFqQjttQkFDRSxLQUFDLENBQUEsVUFBRCxDQUFBLEVBREY7V0FBQSxNQUFBO21CQUdFLEtBQUMsQ0FBQSxTQUFELENBQVcsMERBQVgsRUFIRjtXQUR1QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxCLENBUlAsQ0FESztJQUFBLENBUlA7QUFBQSxJQXlCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBRVYsTUFBQSxJQUFBLENBQUEsSUFBbUMsQ0FBQyxVQUFMLENBQUEsQ0FBL0I7ZUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLFVBQWIsRUFBQTtPQUZVO0lBQUEsQ0F6Qlo7QUFBQSxJQTZCQSxTQUFBLEVBQVcsU0FBQyxLQUFELEdBQUE7QUFFVCxNQUFBLElBQUEsQ0FBQSxJQUErQixDQUFDLFVBQUwsQ0FBQSxDQUEzQjtlQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBZCxFQUFBO09BRlM7SUFBQSxDQTdCWDtHQUpGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/danielsgroves/.atom/packages/latex/lib/latex.coffee