(function() {
  var child_process, path;

  child_process = require("child_process");

  path = require("path");

  module.exports = {
    executable: "latexmk",
    run: function(args, callback) {
      var command, options, proc;
      command = "" + this.executable + " " + (args.join(" "));
      options = {
        env: {
          PATH: this.constructPath()
        }
      };
      proc = child_process.exec(command, options);
      proc.on("close", function(code, signal) {
        return callback(code);
      });
      return proc;
    },
    constructArgs: function(filePath) {
      var args, dir, enableShellEscape, outdir, pdfOpts;
      args = ["-interaction=nonstopmode", "-f", "-cd", "-pdf"];
      pdfOpts = ["-synctex=1", "-file-line-error"];
      enableShellEscape = atom.config.get("latex.enableShellEscape");
      if (enableShellEscape != null) {
        pdfOpts.push("-shell-escape");
      }
      args.push("-pdflatex=\"pdflatex " + (pdfOpts.join(" ")) + " %O %S\"");
      outdir = atom.config.get("latex.outputDirectory");
      if (outdir != null ? outdir.length : void 0) {
        dir = path.dirname(filePath);
        outdir = path.join(dir, outdir);
        args.push("-outdir=" + outdir);
      }
      args.push(filePath);
      return args;
    },
    constructPath: function() {
      var texPath;
      texPath = atom.config.get("latex.texPath");
      return texPath != null ? texPath.replace("$PATH", process.env.PATH) : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsZUFBUixDQUFoQixDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFVBQUEsRUFBWSxTQUFaO0FBQUEsSUFFQSxHQUFBLEVBQUssU0FBQyxJQUFELEVBQU8sUUFBUCxHQUFBO0FBQ0gsVUFBQSxzQkFBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLEVBQUEsR0FBRSxJQUFDLENBQUEsVUFBSCxHQUFlLEdBQWYsR0FBaUIsQ0FBQSxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBQSxDQUEzQixDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQVU7QUFBQSxRQUFBLEdBQUEsRUFBSztBQUFBLFVBQUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBTjtTQUFMO09BRFYsQ0FBQTtBQUFBLE1BSUEsSUFBQSxHQUFPLGFBQWEsQ0FBQyxJQUFkLENBQW1CLE9BQW5CLEVBQTRCLE9BQTVCLENBSlAsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLFNBQUMsSUFBRCxFQUFPLE1BQVAsR0FBQTtlQUNmLFFBQUEsQ0FBUyxJQUFULEVBRGU7TUFBQSxDQUFqQixDQUxBLENBQUE7YUFPQSxLQVJHO0lBQUEsQ0FGTDtBQUFBLElBWUEsYUFBQSxFQUFlLFNBQUMsUUFBRCxHQUFBO0FBQ2IsVUFBQSw2Q0FBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLENBQ0wsMEJBREssRUFFTCxJQUZLLEVBR0wsS0FISyxFQUlMLE1BSkssQ0FBUCxDQUFBO0FBQUEsTUFPQSxPQUFBLEdBQVUsQ0FDUixZQURRLEVBRVIsa0JBRlEsQ0FQVixDQUFBO0FBQUEsTUFZQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IseUJBQWhCLENBWnBCLENBQUE7QUFhQSxNQUFBLElBQWlDLHlCQUFqQztBQUFBLFFBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxlQUFiLENBQUEsQ0FBQTtPQWJBO0FBQUEsTUFjQSxJQUFJLENBQUMsSUFBTCxDQUFXLHVCQUFBLEdBQXNCLENBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFiLENBQUEsQ0FBdEIsR0FBeUMsVUFBcEQsQ0FkQSxDQUFBO0FBQUEsTUFnQkEsTUFBQSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsQ0FoQlQsQ0FBQTtBQWlCQSxNQUFBLHFCQUFHLE1BQU0sQ0FBRSxlQUFYO0FBQ0UsUUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE9BQUwsQ0FBYSxRQUFiLENBQU4sQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFTLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixFQUFlLE1BQWYsQ0FEVCxDQUFBO0FBQUEsUUFFQSxJQUFJLENBQUMsSUFBTCxDQUFXLFVBQUEsR0FBUyxNQUFwQixDQUZBLENBREY7T0FqQkE7QUFBQSxNQXNCQSxJQUFJLENBQUMsSUFBTCxDQUFVLFFBQVYsQ0F0QkEsQ0FBQTthQXVCQSxLQXhCYTtJQUFBLENBWmY7QUFBQSxJQXNDQSxhQUFBLEVBQWUsU0FBQSxHQUFBO0FBQ2IsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGVBQWhCLENBQVYsQ0FBQTsrQkFDQSxPQUFPLENBQUUsT0FBVCxDQUFpQixPQUFqQixFQUEwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQXRDLFdBRmE7SUFBQSxDQXRDZjtHQUpGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/danielsgroves/.atom/packages/latex/lib/latexmk.coffee