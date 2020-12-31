# Perl
cpan HTTP::Server::Brick
perl -MHTTP::Server::Brick -e '$s=HTTP::Server::Brick->new(port=>8000); $s->mount("/"=>{path=>"."}); $s->start'

# PHP 5.4+
php -S localhost:8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Python 3.x
python -m http.server 8000

# Twisted (Python)
python -c 'from twisted.web.server import Site; from twisted.web.static import File; from twisted.internet import reactor; reactor.listenTCP(8000, Site(File("."))); reactor.run()'

# Ruby
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'

# Ruby 1.9.2+
ruby -run -ehttpd . -p8000
