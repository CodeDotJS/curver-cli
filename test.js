import childProcess from 'child_process';
import test from 'ava';

test.cb('default', t => {
	const cp = childProcess.spawn('./cli.js', ['express'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});
